import 'dotenv/config'
import { Client } from 'pg'

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  })
  
  try {
    await client.connect()
    await client.query('ALTER TABLE "Category" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;')
    console.log('Successfully added imageUrl to Category')
  } catch (error) {
    console.error('Error adding column:', error)
  } finally {
    await client.end()
  }
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
