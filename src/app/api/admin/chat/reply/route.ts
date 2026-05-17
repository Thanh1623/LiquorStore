import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { zaloClient } from '@/lib/zalo';

export async function POST(request: NextRequest) {
  const { sessionId, message } = await request.json();
  
  if (!sessionId || !message) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // 1. Get session info
  const sessionRes = await db.query(
    `SELECT "senderId" FROM "ChatSession" WHERE id::text = $1 OR "senderId" = $1`,
    [sessionId]
  );
  
  if (sessionRes.rows.length === 0) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 });
  }
  
  const senderId = sessionRes.rows[0].senderId;

  // 2. Send to Zalo
  await zaloClient.sendMessage(senderId, message);

  // 3. Save to DB
  await db.query(
    `INSERT INTO "ChatMessage" (id, "sessionId", sender, content, "createdAt")
     VALUES (gen_random_uuid(), $1, 'admin', $2, NOW())`,
    [sessionId, message]
  );
  
  return NextResponse.json({ success: true });
}
