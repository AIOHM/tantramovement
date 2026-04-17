-- TTC Tantramovement Database Schema
-- Migrated from Supabase to local PostgreSQL
-- Run this script to create all tables, indexes, and functions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== ENUMS ==========
CREATE TYPE workshop_category AS ENUM ('workshop', 'retreat', 'training', 'massage');

-- ========== TABLES ==========

-- Workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  end_date DATE,
  time TEXT,
  location TEXT,
  capacity TEXT,
  price TEXT,
  category workshop_category NOT NULL DEFAULT 'workshop',
  image_url TEXT,
  facilitator TEXT,
  highlights TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  author TEXT,
  date DATE,
  excerpt TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Site settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Orders table (missing from original migrations, needed for Stripe)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workshop_id UUID NOT NULL REFERENCES workshops(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'pending',
  stripe_session_id TEXT,
  payment_intent_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Consultation requests table
CREATE TABLE IF NOT EXISTS consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  timezone TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Analytics: Page views
CREATE TABLE IF NOT EXISTS analytics_page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Analytics: Events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL,
  event_data JSONB,
  page_path TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Analytics: Time spent
CREATE TABLE IF NOT EXISTS analytics_time_spent (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  time_spent INTEGER NOT NULL,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Admin users table (for local admin auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- ========== INDEXES ==========

-- Workshops
CREATE INDEX IF NOT EXISTS idx_workshops_date ON workshops(date);
CREATE INDEX IF NOT EXISTS idx_workshops_category ON workshops(category);

-- Registrations
CREATE INDEX IF NOT EXISTS idx_registrations_workshop_id ON registrations(workshop_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);

-- Orders
CREATE INDEX IF NOT EXISTS idx_orders_workshop_id ON orders(workshop_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_intent ON orders(payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- Blog posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

-- Analytics
CREATE INDEX IF NOT EXISTS idx_analytics_page_views_path ON analytics_page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_page_views_created ON analytics_page_views(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_time_spent_path ON analytics_time_spent(page_path);

-- Contact/Consultation
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultation_requests_status ON consultation_requests(status);

-- ========== TRIGGERS ==========

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for tables with updated_at
CREATE TRIGGER update_workshops_updated_at
  BEFORE UPDATE ON workshops
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_requests_updated_at
  BEFORE UPDATE ON consultation_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========== ROW LEVEL SECURITY (Optional - can be enabled if needed) ==========
-- By default, all tables are open. To enable RLS, uncomment the ALTER TABLE statements
-- and create appropriate policies.

-- ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- etc.

-- ========== SEED DATA ==========

-- Insert default admin user (password: admin123 - CHANGE IN PRODUCTION)
-- Password is bcrypt hash of "admin123"
INSERT INTO admin_users (username, password_hash, email, is_active)
VALUES (
  'admin',
  '$2a$10$r.jQKUyW2SIRLz9oM3.7XOvFVYTN9R.EWmTQE.8ZqQb6Q6xMVKGO6',
  'contact@tantramovement.com',
  true
) ON CONFLICT (username) DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (id, settings) VALUES (
  gen_random_uuid(),
  '{"featuredSection": {"title": "Transform Your Relationships Through Sacred Connection", "content": "Tantra is more than a practice—it''s a path to deeper self-awareness and more fulfilling relationships. Our approach combines ancient wisdom with modern techniques to help you:", "quote": "The journey of Tantra begins with self-love and expands to embrace all of life.", "bulletPoints": ["Cultivate presence and mindfulness in your interactions", "Connect more deeply with yourself and others", "Explore the sacred dimensions of your sexuality", "Heal blocks and wounds that prevent intimacy"]}}'::jsonb
) ON CONFLICT DO NOTHING;

-- Insert sample workshops (for testing)
INSERT INTO workshops (title, description, date, time, location, price, category, highlights, facilitator) VALUES
('Introduction to Neo Tantra', 'A gentle introduction to the principles of Neo Tantra...', '2025-06-15', '10:00 AM', 'Online', '$99', 'workshop', ARRAY['Meditation', 'Breathwork', 'Sacred Sexuality'], 'Michal Kali Griks'),
('Sacred Connection: Couples Retreat', 'Deepen your connection with your partner...', '2025-07-20', '9:00 AM', 'Bali, Indonesia', '$499', 'retreat', ARRAY['Couples Exercises', 'Tantric Massage', 'Daily Meditations'], 'Michal Kali Griks'),
('Neo Tantra Facilitator Training: Level 1', 'Become a certified Neo Tantra facilitator...', '2025-08-10', '8:00 AM', 'Online', '$199', 'training', ARRAY['Teaching Skills', 'Ethics', 'Practical Sessions'], 'Michal Kali Griks')
ON CONFLICT DO NOTHING;

SELECT 'Schema created and seeded successfully!' as message;
