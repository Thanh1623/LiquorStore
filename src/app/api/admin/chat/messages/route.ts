import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('sessionId');
  
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 });
  }

  const messages = await db.query(
    `SELECT * FROM "ChatMessage" WHERE "sessionId" = $1 ORDER BY "createdAt" ASC`,
    [sessionId]
  );
  
  return NextResponse.json({ data: messages.rows });
}
