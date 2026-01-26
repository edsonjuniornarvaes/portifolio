-- Script SQL para criar/verificar o schema de analytics
-- Este script verifica se as tabelas e políticas já existem antes de criar

-- Criar tabelas se não existirem
CREATE TABLE IF NOT EXISTS page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  duration INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tab_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  tab_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS click_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  element_type TEXT NOT NULL,
  element_id TEXT,
  element_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar coluna duration se não existir
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'page_views' 
    AND column_name = 'duration'
  ) THEN
    ALTER TABLE page_views ADD COLUMN duration INTEGER;
  END IF;
END $$;

-- Criar índices se não existirem
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_page_path ON page_views(page_path);
CREATE INDEX IF NOT EXISTS idx_tab_views_created_at ON tab_views(created_at);
CREATE INDEX IF NOT EXISTS idx_click_events_created_at ON click_events(created_at);

-- Habilitar RLS
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE tab_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE click_events ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver (para evitar conflitos)
DROP POLICY IF EXISTS "Allow public inserts on page_views" ON page_views;
DROP POLICY IF EXISTS "Allow public inserts on tab_views" ON tab_views;
DROP POLICY IF EXISTS "Allow public inserts on click_events" ON click_events;
DROP POLICY IF EXISTS "Allow service role to read page_views" ON page_views;
DROP POLICY IF EXISTS "Allow service role to read tab_views" ON tab_views;
DROP POLICY IF EXISTS "Allow service role to read click_events" ON click_events;

-- Criar políticas de inserção pública (para rastreamento)
CREATE POLICY "Allow public inserts on page_views"
  ON page_views FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on tab_views"
  ON tab_views FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public inserts on click_events"
  ON click_events FOR INSERT
  TO anon
  WITH CHECK (true);

-- Criar políticas de leitura para service_role (usado nas API routes)
CREATE POLICY "Allow service role to read page_views"
  ON page_views FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to read tab_views"
  ON tab_views FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to read click_events"
  ON click_events FOR SELECT
  TO service_role
  USING (true);
