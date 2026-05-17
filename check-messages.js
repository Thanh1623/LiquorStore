const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function checkMessages() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const res = await client.query('SELECT * FROM "ChatMessage"');
  console.log('Messages:', res.rows);
  await client.end();
}

checkMessages();
