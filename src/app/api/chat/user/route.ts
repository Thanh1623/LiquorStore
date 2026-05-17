import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ChatService } from '@/lib/chat/ChatService';

export async function POST(request: NextRequest) {
  const { sessionId, message } = await request.json();
  
  // 1. Save to DB
  await db.query(
    `INSERT INTO "ChatMessage" (id, "sessionId", sender, content, "createdAt")
     VALUES (gen_random_uuid(), $1, 'user', $2, NOW())`,
    [sessionId, message]
  );
  
  // 2. Trigger Bot Logic
  // I need to adapt the event structure
  await ChatService.processWebEvent({ senderId: sessionId, message: { text: message } });

  return NextResponse.json({ success: true });
}
