-- Migração para adicionar campo duration na tabela page_views
-- Execute este script se você já criou a tabela page_views anteriormente

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
