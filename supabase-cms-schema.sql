-- CMS: posts em markdown + credenciais admin + reset de senha
-- Execute no SQL Editor do Supabase (pode rodar depois do schema de analytics).

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  cover_image_url TEXT,
  body_markdown TEXT NOT NULL DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

CREATE TABLE IF NOT EXISTS admin_credentials (
  id INT PRIMARY KEY CHECK (id = 1),
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_token ON password_reset_tokens(token);

-- Hash inicial = mesmo bcrypt do login (!Edsandrade@030adm)
INSERT INTO admin_credentials (id, email, password_hash)
VALUES (
  1,
  'edsonjunior.narvaes@gmail.com',
  '$2b$10$v72K7Iq8d1kquoEK.orSXuk/kdGZ1cvMzLmwC1obUSRr3WIcJuJ/u'
)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
CREATE POLICY "Public read published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published = true);

DROP POLICY IF EXISTS "Anon insert blog for tracking skip" ON blog_posts;
DROP POLICY IF EXISTS "Service role full blog_posts" ON blog_posts;
CREATE POLICY "Service role full blog_posts"
  ON blog_posts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role admin_credentials" ON admin_credentials;
CREATE POLICY "Service role admin_credentials"
  ON admin_credentials FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role password_reset" ON password_reset_tokens;
CREATE POLICY "Service role password_reset"
  ON password_reset_tokens FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Overrides de projetos do portfólio (mockups, destaques, galeria, toggles)
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id TEXT PRIMARY KEY,
  payload JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_updated ON portfolio_projects(updated_at DESC);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read portfolio_projects" ON portfolio_projects;
CREATE POLICY "Public read portfolio_projects"
  ON portfolio_projects FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Service role portfolio_projects" ON portfolio_projects;
CREATE POLICY "Service role portfolio_projects"
  ON portfolio_projects FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
