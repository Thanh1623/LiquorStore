const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function listProducts() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  const res = await client.query('SELECT name FROM "Product"');
  console.log('Products:', res.rows.map(r => r.name));
  await client.end();
}

listProducts();
