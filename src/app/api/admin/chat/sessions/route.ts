import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  const sessions = await db.query(`
    SELECT s.*, m.content as "lastMessage", m."createdAt" as "lastMessageAt"
    FROM "ChatSession" s
    LEFT JOIN LATERAL (
      SELECT content, "createdAt" 
      FROM "ChatMessage" 
      WHERE "sessionId" = s.id 
      ORDER BY "createdAt" DESC 
      LIMIT 1
    ) m ON true
    ORDER BY s."updatedAt" DESC
  `);
  
  return NextResponse.json({ data: sessions.rows });
}
