import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSeed() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('❌ Error: DATABASE_URL environment variable is missing.');
    console.error('Please set DATABASE_URL in your .env file or environment before seeding.');
    console.error('Example: DATABASE_URL="postgresql://user:pass@ep-cool-xyz.ap-southeast-1.aws.neon.tech/neondb"');
    process.exit(1);
  }

  console.log('🔄 Connecting to PostgreSQL database...');
  const pool = new Pool({
    connectionString: dbUrl,
    ssl: dbUrl.includes('neon.tech') || dbUrl.includes('supabase') ? { rejectUnauthorized: false } : false
  });

  try {
    const client = await pool.connect();
    console.log('✅ Connected to database. Reading schema.sql...');

    const schemaPath = path.resolve(__dirname, '../schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('⚡ Executing schema and seed statements...');
    await client.query(sql);

    const { rows: menuRows } = await client.query('SELECT count(*) FROM menu_items');
    const { rows: custRows } = await client.query('SELECT count(*) FROM customers');
    const { rows: orderRows } = await client.query('SELECT count(*) FROM orders');

    console.log('🎉 Database migration & seed completed successfully!');
    console.log(`📊 Menu items seeded: ${menuRows[0].count}`);
    console.log(`👥 Customers seeded: ${custRows[0].count}`);
    console.log(`🧾 Orders seeded: ${orderRows[0].count}`);

    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  }
}

runSeed();
