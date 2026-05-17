import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const messages = await db.query(
    `SELECT m.* FROM "ChatMessage" m
     JOIN "ChatSession" s ON m."sessionId" = s.id
     WHERE s.id::text = $1 OR s."senderId" = $1
     ORDER BY m."createdAt" ASC`,
    [sessionId]
  );
  
  return NextResponse.json({ data: messages.rows });
}
