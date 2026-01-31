// Migration script: export users from local SQLite (giftgroove.db) into Postgres
// Usage: set DATABASE_URL in env, then run: node migrate-sqlite-to-postgres.js

require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');
const path = require('path');

const sqlitePath = path.join(__dirname, 'giftgroove.db');
const sqliteDb = new sqlite3.Database(sqlitePath, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Error opening SQLite DB:', err);
    process.exit(1);
  }
});

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('Please set DATABASE_URL in environment before running this script.');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

async function migrate() {
  try {
    // Ensure target table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT NOT NULL,
        password TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    sqliteDb.all('SELECT id, firstName, lastName, email, phone, password, createdAt FROM users', async (err, rows) => {
      if (err) {
        console.error('Error reading from SQLite:', err);
        process.exit(1);
      }

      console.log(`Found ${rows.length} users in SQLite. Starting migration...`);

      for (const row of rows) {
        try {
          await pool.query(
            `INSERT INTO users (firstName, lastName, email, phone, password, createdAt)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (email) DO NOTHING`,
            [row.firstName, row.lastName, row.email, row.phone, row.password, row.createdAt]
          );
          console.log(`Migrated user: ${row.email}`);
        } catch (e) {
          console.error(`Failed to migrate ${row.email}:`, e.message || e);
        }
      }

      console.log('Migration complete. Closing connections.');
      sqliteDb.close();
      await pool.end();
      process.exit(0);
    });
  } catch (e) {
    console.error('Migration failed:', e);
    process.exit(1);
  }
}

migrate();
