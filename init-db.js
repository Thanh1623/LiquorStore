const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function createTables() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  
  await client.query(`
    CREATE TABLE "ChatSession" (
      "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "platform" TEXT NOT NULL,
      "senderId" TEXT NOT NULL,
      "status" TEXT NOT NULL DEFAULT 'active',
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT "ChatSession_platform_senderId_key" UNIQUE ("platform", "senderId")
    );

    CREATE TABLE "ChatMessage" (
      "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      "sessionId" UUID NOT NULL,
      "sender" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT "ChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id")
    );
  `);
  console.log('Tables created successfully.');
  await client.end();
}

createTables().catch(console.error);
