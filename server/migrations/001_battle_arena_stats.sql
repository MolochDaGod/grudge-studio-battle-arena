-- Battle Arena Stats Table
-- Run this migration on your Neon PostgreSQL database

CREATE TABLE IF NOT EXISTS battle_arena_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  total_kills BIGINT DEFAULT 0,
  total_deaths BIGINT DEFAULT 0,
  total_matches BIGINT DEFAULT 0,
  total_playtime_minutes INTEGER DEFAULT 0,
  highest_killstreak INTEGER DEFAULT 0,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL
);

CREATE INDEX idx_battle_arena_stats_account ON battle_arena_stats(account_id);

-- Add comment
COMMENT ON TABLE battle_arena_stats IS 'Tracks player statistics for the Battle Arena game mode';
