import { NextRequest, NextResponse } from 'next/server';
import { ChatService } from '@/lib/chat/ChatService';

// Zalo Webhook Event Handling (POST)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 2. Log event
    console.log('Zalo Webhook Event Received:', JSON.stringify(body, null, 2));
    
    // 3. Process event
    await ChatService.processZaloEvent(body);
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error handling Zalo webhook:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
