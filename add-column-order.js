const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function addSenderIdToOrder() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  
  await client.query(`
    ALTER TABLE "Order" ADD COLUMN IF NOT EXISTS "senderId" TEXT;
  `);
  console.log('Column "senderId" added to "Order" table.');
  await client.end();
}

addSenderIdToOrder().catch(console.error);
