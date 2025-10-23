-- Migration: Add consent column to quotes table
-- Timestamp: 2025-10-23 15:30:00 UTC
-- Description: Adds a required boolean consent column with default false to align with
-- API payload (user must explicitly consent; schema will store provided value).

ALTER TABLE quotes
ADD COLUMN IF NOT EXISTS consent boolean NOT NULL DEFAULT false;

-- Optional: Backfill existing rows (none expected in fresh environment) to explicit false
UPDATE quotes SET consent = false WHERE consent IS NULL;

-- Note: RLS policies remain valid; no change required as policies are permissive (true).