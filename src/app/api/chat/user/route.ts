import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { ChatService } from '@/lib/chat/ChatService';

export async function POST(request: NextRequest) {
  const { sessionId, message } = await request.json();
  
  // 1. Trigger Bot Logic (Handles session creation and message saving)
  await ChatService.processWebEvent({ senderId: sessionId, message: { text: message } });

  return NextResponse.json({ success: true });
}
