import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

let pool = null;
let isPostgresConnected = false;

if (process.env.DATABASE_URL) {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('neon.tech') || process.env.DATABASE_URL.includes('supabase')
        ? { rejectUnauthorized: false }
        : false
    });

    pool.on('error', (err) => {
      console.error('⚠️ Unexpected PostgreSQL client error:', err.message);
    });

    // Test connection
    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        console.warn('⚠️ PostgreSQL connection failed:', err.message);
        console.warn('⚡ Operating with in-memory store.js fallback.');
      } else {
        isPostgresConnected = true;
        console.log('🐘 PostgreSQL connected successfully! Server is in CLOUD DATABASE mode.');
      }
    });
  } catch (err) {
    console.warn('⚠️ PostgreSQL initialization warning:', err.message);
  }
} else {
  console.log('ℹ️ No DATABASE_URL provided. Operating in high-speed In-Memory (store.js) mode.');
}

export { pool, isPostgresConnected };
