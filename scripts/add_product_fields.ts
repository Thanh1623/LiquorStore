import 'dotenv/config'
import { Client } from 'pg'

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    await client.connect()
    await client.query(`
      ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "isFeatured" BOOLEAN NOT NULL DEFAULT false;
      ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "badge" TEXT;
      ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "oldPrice" DECIMAL;
    `)
    console.log('Successfully added new fields to Product')
  } catch (error) {
    console.error('Error adding columns:', error)
  } finally {
    await client.end()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
