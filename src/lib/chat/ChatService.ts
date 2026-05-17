import { db } from '@/lib/db';
import { zaloClient } from '@/lib/zalo';

export const ChatService = {
  async processWebEvent(event: any) {
    console.log('Processing Web event:', event);
    
    // Ensure Session exists for Web
    await db.query(
      `INSERT INTO "ChatSession" (id, platform, "senderId", status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), 'web', $1, 'active', NOW(), NOW())
       ON CONFLICT ("platform", "senderId") DO UPDATE SET "updatedAt" = NOW()`,
      [event.senderId]
    );

    // Process Logic (similar to processZaloEvent)
    const message = (event.message?.text || '').toLowerCase();
    
    if (message.includes('mua ')) {
      const productName = message.split('mua ')[1].trim();
      await this.handleOrderPlacement(event.senderId, productName, 'web');
    } else if (message.includes('whiskey')) {
      await this.handleWhiskeyPurchase(event.senderId);
    }
    
    return { success: true };
  },

  async processZaloEvent(event: any) {
    console.log('DEBUG: Processing Zalo event:', JSON.stringify(event));
    
    // 1. Ensure Session exists
    const sessionRes = await db.query(
      `INSERT INTO "ChatSession" (id, platform, "senderId", status, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, 'active', NOW(), NOW())
       ON CONFLICT ("platform", "senderId") DO UPDATE SET "updatedAt" = NOW()
       RETURNING id`,
      ['zalo', event.senderId]
    );
    const sessionId = sessionRes.rows[0].id;
    console.log('DEBUG: Session ID:', sessionId);
    
    // 2. Save Message
    await db.query(
      `INSERT INTO "ChatMessage" (id, "sessionId", sender, content, "createdAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW())`,
      [sessionId, event.senderId, event.message?.text || '']
    );

    // 3. Process Logic
    const message = (event.message?.text || '').toLowerCase();
    console.log('DEBUG: Message processed:', message);
    
    if (message.includes('mua ')) {
      const productName = message.split('mua ')[1].trim();
      console.log('DEBUG: Identified "mua" intent for:', productName);
      await this.handleOrderPlacement(event.senderId, productName, 'zalo');
    } else if (message.includes('whiskey')) {
      await this.handleWhiskeyPurchase(event.senderId);
    } else {
      await zaloClient.sendMessage(event.senderId, "Chào bạn, mình có thể giúp gì cho bạn? Bạn có thể thử hỏi 'mua [tên rượu]' hoặc xem danh sách 'whiskey'.");
    }
    
    return { success: true };
  },

  async handleOrderPlacement(senderId: string, productName: string, platform: string = 'zalo') {
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
  },

  async notifyOrderStatus(senderId: string, orderId: string, status: string) {
    console.log('Notifying order status for:', senderId, 'Order:', orderId, 'Status:', status);
    const message = `Đơn hàng #${orderId.substring(0, 8)} của bạn đã được cập nhật trạng thái: ${status.toUpperCase()}.`;
    await zaloClient.sendMessage(senderId, message);
  }
};
