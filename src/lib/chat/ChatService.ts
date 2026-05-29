import { db } from '@/lib/db';
import { zaloClient } from '@/lib/zalo';
import { groq } from '@/lib/groq';

const SYSTEM_PROMPT = `You are a refined, sophisticated sommelier at a luxury liquor store named LuxeStore.
Your tone is elegant, professional, and concise. You provide expert guidance on spirits.
You can help customers choose products and handle orders.
If a customer wants to buy, use the exact name of the product from the list.

Knowledge Base:
- Products: {products}
- Shipping Policy: We offer free shipping for orders over 2.000.000 VNĐ. Standard delivery takes 1-3 days.
- Return Policy: We accept returns within 7 days if the product seal is unopened.

If you don't know the answer, politely guide them to contact our staff.`;

export class ChatService {
  static async getProductContext(): Promise<string> {
    const products = await db.query('SELECT name, price FROM "Product"');
    return products.rows.map(p => `${p.name} (${p.price} VNĐ)`).join(', ');
  }

  static async handleWhiskeyPurchase(senderId: string): Promise<void> {
    console.log('Handling whiskey purchase for:', senderId);
    
    // 1. Truy vấn sản phẩm
    const products = await db.query(
      `SELECT name, price FROM "Product" WHERE name ILIKE $1 LIMIT 3`,
      ['%whiskey%']
    );
    
    // 2. Tạo nội dung trả lời
    let reply = "Chào bạn, đây là các loại Whiskey bên mình:\n";
    products.rows.forEach(p => {
      reply += `- ${p.name}: ${p.price} VNĐ\n`;
    });
    reply += "\nBạn muốn mua loại nào? Hãy nhắn 'mua [tên sản phẩm]' nhé!";
    
    // 3. Gửi trả lại Zalo
    await zaloClient.sendMessage(senderId, reply);
  }

  static async handleOrderPlacement(senderId: string, productName: string, platform: string = 'zalo'): Promise<void> {
    console.log('DEBUG: Handling order placement for:', senderId, 'Product:', productName);
    
    // 1. Find product
    const productRes = await db.query('SELECT id, name, price FROM "Product" WHERE name ILIKE $1', [`%${productName}%`]);
    
    console.log('DEBUG: Product query result:', productRes.rows);

    if (productRes.rows.length === 0) {
      console.log('DEBUG: Product not found');
      if (platform === 'zalo') await zaloClient.sendMessage(senderId, `Xin lỗi, mình không tìm thấy sản phẩm '${productName}'.`);
      return;
    }
    
    const product = productRes.rows[0];
    
    // 2. Create Order
    console.log('DEBUG: Creating order...');
    const orderRes = await db.query(
      `INSERT INTO "Order" (id, "totalAmount", status, "createdAt", "senderId")
       VALUES (gen_random_uuid(), $1, 'pending', NOW(), $2)
       RETURNING id`,
      [product.price, senderId]
    );
    console.log('DEBUG: Order created, ID:', orderRes.rows[0].id);
    const orderId = orderRes.rows[0].id;
    
    // 3. Create OrderItem
    console.log('DEBUG: Creating order item...');
    await db.query(
      `INSERT INTO "OrderItem" (id, "orderId", "productId", quantity, "priceAtTime")
       VALUES (gen_random_uuid(), $1, $2, 1, $3)`,
      [orderId, product.id, product.price]
    );
    console.log('DEBUG: Order item created');
    
    // 4. Confirm
    if (platform === 'zalo') {
      await zaloClient.sendMessage(senderId, `Đã đặt hàng thành công! Đơn hàng của bạn: ${product.name} - Giá: ${product.price} VNĐ.`);
    }
  }

  static async notifyOrderStatus(senderId: string, orderId: string, status: string): Promise<void> {
    console.log('Notifying order status for:', senderId, 'Order:', orderId, 'Status:', status);
    const message = `Đơn hàng #${orderId.substring(0, 8)} của bạn đã được cập nhật trạng thái: ${status.toUpperCase()}.`;
    await zaloClient.sendMessage(senderId, message);
  }

  static async processWebEvent(event: any): Promise<{ success: boolean; reply?: string }> {
    const message = (event.message?.text || '').toLowerCase();
    
    // 1. Identify Purchase Intent
    if (message.includes('mua ')) {
      const productName = message.split('mua ')[1].trim();
      await ChatService.handleOrderPlacement(event.senderId, productName, 'web');
      return { success: true }; // Order placement sends its own message
    }

    // 2. AI Processing
    const sessionRes = await db.query(
      `INSERT INTO "ChatSession" (id, platform, "senderId", status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), 'web', $1, 'active', NOW(), NOW())
       ON CONFLICT ("platform", "senderId") DO UPDATE SET "updatedAt" = NOW()
       RETURNING id`,
      [event.senderId]
    );
    const sessionId = sessionRes.rows[0].id;

    await db.query(
      `INSERT INTO "ChatMessage" (id, "sessionId", sender, content, "createdAt")
       VALUES (gen_random_uuid(), $1, 'user', $2, NOW())`,
      [sessionId, event.message?.text || '']
    );

    const products = await ChatService.getProductContext();
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT.replace('{products}', products) },
        { role: 'user', content: event.message?.text || '' }
      ],
      model: 'llama-3.3-70b-versatile',
    });

    const aiReply = chatCompletion.choices[0]?.message?.content || 'Xin lỗi, tôi chưa thể trả lời bạn lúc này.';

    await db.query(
      `INSERT INTO "ChatMessage" (id, "sessionId", sender, content, "createdAt")
       VALUES (gen_random_uuid(), $1, 'admin', $2, NOW())`,
      [sessionId, aiReply]
    );
    
    return { success: true, reply: aiReply };
  }

  static async processZaloEvent(event: any): Promise<{ success: boolean }> {
    console.log('DEBUG: Processing Zalo event:', JSON.stringify(event));
    
    const sessionRes = await db.query(
      `INSERT INTO "ChatSession" (id, platform, "senderId", status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, 'active', NOW(), NOW())
       ON CONFLICT ("platform", "senderId") DO UPDATE SET "updatedAt" = NOW()
       RETURNING id`,
      ['zalo', event.senderId]
    );
    const sessionId = sessionRes.rows[0].id;
    console.log('DEBUG: Session ID:', sessionId);
    
    await db.query(
      `INSERT INTO "ChatMessage" (id, "sessionId", sender, content, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
      [sessionId, event.senderId, event.message?.text || '']
    );

    const message = (event.message?.text || '').toLowerCase();
    console.log('DEBUG: Message processed:', message);
    
    if (message.includes('mua ')) {
      const productName = message.split('mua ')[1].trim();
      console.log('DEBUG: Identified "mua" intent for:', productName);
      await ChatService.handleOrderPlacement(event.senderId, productName, 'zalo');
    } else if (message.includes('whiskey')) {
      await ChatService.handleWhiskeyPurchase(event.senderId);
    } else {
      await zaloClient.sendMessage(event.senderId, "Chào bạn, mình có thể giúp gì cho bạn? Bạn có thể thử hỏi 'mua [tên rượu]' hoặc xem danh sách 'whiskey'.");
    }
    
    return { success: true };
  }
}
