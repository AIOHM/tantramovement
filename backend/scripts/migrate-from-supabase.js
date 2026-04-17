import { Pool } from 'pg';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const pg = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'ttc_tantramovement',
  user: process.env.DB_USER || 'ttc_user',
  password: process.env.DB_PASSWORD,
});

const tables = [
  'workshops',
  'blog_posts',
  'site_settings',
  'contact_messages',
  'newsletter_subscribers',
  'consultation_requests',
  'analytics_page_views',
  'analytics_events',
  'analytics_time_spent',
  'registrations',
  'orders', // missing in migrations but referenced in edge functions
];

async function truncateLocalTables() {
  const client = await pg.connect();
  try {
    await client.query('BEGIN');
    // Truncate in reverse order to avoid FK issues
    await client.query('TRUNCATE TABLE orders CASCADE');
    await client.query('TRUNCATE TABLE registrations CASCADE');
    await client.query('TRUNCATE TABLE workshops CASCADE');
    await client.query('TRUNCATE TABLE blog_posts CASCADE');
    await client.query('TRUNCATE TABLE site_settings CASCADE');
    await client.query('TRUNCATE TABLE contact_messages CASCADE');
    await client.query('TRUNCATE TABLE newsletter_subscribers CASCADE');
    await client.query('TRUNCATE TABLE consultation_requests CASCADE');
    await client.query('TRUNCATE TABLE analytics_page_views CASCADE');
    await client.query('TRUNCATE TABLE analytics_events CASCADE');
    await client.query('TRUNCATE TABLE analytics_time_spent CASCADE');
    await client.query('COMMIT');
    console.log('Local tables truncated');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

async function migrateTable(tableName) {
  console.log(`\nMigrating ${tableName}...`);
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    console.error(`Error fetching ${tableName}:`, error);
    return 0;
  }

  if (!data || data.length === 0) {
    console.log(`  No data in ${tableName}`);
    return 0;
  }

  const client = await pg.connect();
  try {
    const rows = data.map(row => {
      const clean = { ...row };
      // Remove empty/undefined fields that don't exist in local schema
      Object.keys(clean).forEach(key => {
        if (clean[key] === undefined || clean[key] === null) {
          delete clean[key];
        }
      });
      return clean;
    });

    // Build INSERT query
    const columns = Object.keys(rows[0]);
    const values = rows.map(row => columns.map(col => `$${columns.indexOf(col) + 1}`)).join(', ');
    const query = `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES ${values}`;

    // Execute each row separately for simplicity (scale as needed)
    let count = 0;
    for (const row of rows) {
      const vals = columns.map(col => row[col]);
      await client.query(query, vals);
      count++;
    }

    console.log(`  Migrated ${count} rows from ${tableName}`);
    return count;
  } catch (e) {
    console.error(`Error migrating ${tableName}:`, e.message);
    throw e;
  } finally {
    client.release();
  }
}

async function runMigration() {
  try {
    console.log('Starting migration from Supabase to local PostgreSQL...\n');

    // Test connections
    await supabase.from('workshops').select('count');
    await pg.query('SELECT 1');

    console.log('Connections established.\n');

    // Ask for confirmation
    console.log('WARNING: This will delete ALL data in local tables and overwrite with Supabase data.');
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    await truncateLocalTables();

    let total = 0;
    for (const table of tables) {
      const count = await migrateTable(table);
      total += count;
    }

    console.log(`\nMigration complete! Total rows migrated: ${total}`);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
