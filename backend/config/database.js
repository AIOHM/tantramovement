import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import Redis from 'ioredis';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '3306'),
  database: process.env.DB_NAME || 'tantramovement_wp',
  user: process.env.DB_USER || 'aiohm_app',
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
  charset: 'utf8mb4',
});

async function query(queryText, params = []) {
  const sql = queryText.replace(/\$([0-9]+)/g, '?');
  const [rows] = await pool.execute(sql, params);
  return { rows };
}

async function ensureTables() {
  const connection = await pool.getConnection();
  try {
    await connection.query('SELECT 1');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS workshops (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        title TEXT NOT NULL,
        description TEXT,
        date DATE NOT NULL,
        end_date DATE,
        time TEXT,
        location TEXT,
        capacity TEXT,
        price TEXT,
        category VARCHAR(50) NOT NULL DEFAULT 'workshop',
        image_url TEXT,
        facilitator TEXT,
        highlights JSON,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_workshops_date (date),
        KEY idx_workshops_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        title TEXT NOT NULL,
        content LONGTEXT,
        image_url TEXT,
        author TEXT,
        date DATE,
        excerpt TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_blog_posts_date (date)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        settings JSON NOT NULL DEFAULT ('{}'),
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        KEY idx_contact_messages_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS registrations (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        workshop_id CHAR(36) NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        status TEXT DEFAULT 'pending',
        payment_status TEXT DEFAULT 'pending',
        stripe_session_id TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        KEY idx_registrations_workshop_id (workshop_id),
        KEY idx_registrations_email (email),
        KEY idx_registrations_status (status),
        CONSTRAINT fk_registrations_workshops FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        workshop_id CHAR(36) NOT NULL,
        customer_name TEXT NOT NULL,
        customer_email TEXT NOT NULL,
        amount INT NOT NULL,
        currency TEXT NOT NULL DEFAULT 'usd',
        status TEXT NOT NULL DEFAULT 'pending',
        stripe_session_id TEXT,
        payment_intent_id TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_orders_workshop_id (workshop_id),
        KEY idx_orders_payment_intent (payment_intent_id),
        KEY idx_orders_status (status),
        CONSTRAINT fk_orders_workshops FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS consultation_requests (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        message TEXT,
        timezone TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_consultation_requests_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS analytics_page_views (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        page_path TEXT NOT NULL,
        referrer TEXT,
        user_agent TEXT,
        session_id TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        KEY idx_analytics_page_views_path (page_path),
        KEY idx_analytics_page_views_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        event_name TEXT NOT NULL,
        event_data JSON,
        page_path TEXT,
        session_id TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        KEY idx_analytics_events_name (event_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS analytics_time_spent (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        page_path TEXT NOT NULL,
        time_spent INT NOT NULL,
        session_id TEXT,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        KEY idx_analytics_time_spent_path (page_path)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
        username VARCHAR(128) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        email VARCHAR(255),
        is_active TINYINT(1) DEFAULT 1,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_login_at DATETIME,
        KEY idx_admin_users_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    const [adminRows] = await connection.query('SELECT id FROM admin_users WHERE username = ?', ['admin']);
    if (Array.isArray(adminRows) && adminRows.length === 0) {
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      const passwordHash = await bcrypt.hash(password, 10);
      await connection.query(
        'INSERT INTO admin_users (id, username, password_hash, email, is_active) VALUES (?, ?, ?, ?, ?)',
        [randomUUID(), 'admin', passwordHash, process.env.ADMIN_EMAIL || 'contact@tantramovement.com', 1]
      );
      console.log('Created default admin user for TTC backend');
    }

    const [settingsRows] = await connection.query('SELECT id FROM site_settings LIMIT 1');
    if (Array.isArray(settingsRows) && settingsRows.length === 0) {
      await connection.query('INSERT INTO site_settings (id, settings) VALUES (?, ?)', [randomUUID(), JSON.stringify({})]);
      console.log('Created default site_settings row');
    }
  } finally {
    connection.release();
  }
}

ensureTables().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

const redis = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379');
redis.on('error', (err) => console.error('Redis error:', err));
redis.on('connect', () => console.log('Connected to Redis'));

export const db = { query };
export { redis };
