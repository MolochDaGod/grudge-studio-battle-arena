# Grudge Studio Battle Arena - Deployment Guide

## Prerequisites
1. GitHub account (✅ Already created: https://github.com/MolochDaGod/grudge-studio-battle-arena)
2. Vercel account (sign up at https://vercel.com)
3. Neon PostgreSQL database (from Warlord-Crafting-Suite)
4. Crossmint API key (optional, for wallet features)

## Database Setup

### 1. Run Database Migration
Connect to your existing Grudge DB (Neon PostgreSQL) and run the migration:

```bash
# Navigate to server directory
cd server/migrations

# Run the migration SQL file on your Neon database
# You can do this via Neon Console SQL Editor or psql
```

The migration creates the `battle_arena_stats` table:
```sql
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
```

### 2. Verify Database Schema
Ensure your Neon database has these tables (from Warlord-Crafting-Suite):
- `users` - User authentication
- `accounts` - Game accounts
- `auth_tokens` - Session management
- `battle_arena_stats` - Battle arena statistics (NEW)

## Deployment Steps

### Option A: Deploy via Vercel CLI (Recommended)

#### 1. Install Vercel CLI
```bash
npm install -g vercel
```

#### 2. Login to Vercel
```bash
vercel login
```

#### 3. Deploy Client
```bash
cd client
vercel --prod
```

**Environment Variables for Client:**
- `VITE_SERVER_URL` - WebSocket URL of your deployed server (e.g., `wss://your-server.vercel.app`)

#### 4. Deploy Server
```bash
cd ../server
vercel --prod
```

**Environment Variables for Server:**
- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `CROSSMINT_API_KEY` - Crossmint API key (optional)
- `CLIENT_URL` - URL of your deployed client (for CORS)
- `PORT` - 2567 (default)
- `SESSION_SECRET` - Random secret key

### Option B: Deploy via Vercel Dashboard

#### 1. Import GitHub Repository
1. Go to https://vercel.com/new
2. Import `grudge-studio-battle-arena` repository
3. Create two separate projects:
   - `grudge-battle-arena-client` (client folder)
   - `grudge-battle-arena-server` (server folder)

#### 2. Configure Client Project
- **Framework Preset:** Vite
- **Root Directory:** `client`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables:**
```
VITE_SERVER_URL=wss://your-server-url.vercel.app
```

#### 3. Configure Server Project
- **Framework Preset:** Other
- **Root Directory:** `server`
- **Build Command:** Leave empty
- **Output Directory:** Leave empty
- **Install Command:** `npm install`

**Environment Variables:**
```
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
CROSSMINT_API_KEY=your_crossmint_key
CLIENT_URL=https://your-client-url.vercel.app
PORT=2567
SESSION_SECRET=your_random_secret
```

## Post-Deployment Configuration

### 1. Update Client Environment Variable
After server is deployed, update the client's `VITE_SERVER_URL`:
```bash
# In Vercel dashboard or CLI
vercel env add VITE_SERVER_URL
# Enter: wss://your-server-url.vercel.app
```

Then redeploy the client:
```bash
cd client
vercel --prod
```

### 2. Test Authentication Flow
1. Visit your client URL (e.g., https://grudge-battle-arena.vercel.app/login.html)
2. Register a new account
3. Verify Crossmint wallet is created (check database)
4. Login and join game
5. Check that stats are saved after playing

### 3. Verify Database Integration
Check your Neon database to ensure:
- New users are created in `users` table
- Accounts created with crossmint_email in `accounts` table
- Auth tokens stored in `auth_tokens` table
- Stats tracked in `battle_arena_stats` table after gameplay

## Environment Variables Reference

### Server (.env)
```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
CROSSMINT_API_KEY=your_crossmint_api_key_here
PORT=2567
NODE_ENV=production
CLIENT_URL=https://your-client-url.vercel.app
SESSION_SECRET=your_random_secret_key_here
```

### Client (.env)
```env
VITE_SERVER_URL=wss://your-server-url.vercel.app
```

## Troubleshooting

### WebSocket Connection Fails
- Ensure server URL uses `wss://` (not `ws://`)
- Check CORS configuration in server
- Verify CLIENT_URL environment variable is set

### Database Connection Fails
- Verify DATABASE_URL is correct
- Check Neon database is active
- Ensure SSL mode is set to `require`

### Authentication Not Working
- Check DATABASE_URL is pointing to Grudge DB
- Verify database migration was run
- Check server logs for database errors

### Crossmint Wallet Not Created
- Verify CROSSMINT_API_KEY is set
- Check Crossmint API key is valid
- Review server logs for Crossmint API errors

## Monitoring

### Server Logs
```bash
vercel logs your-server-url.vercel.app
```

### Database Queries
Use Neon Console SQL Editor to check:
```sql
-- Check users
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- Check battle arena stats
SELECT * FROM battle_arena_stats ORDER BY updated_at DESC LIMIT 10;

-- Check active tokens
SELECT * FROM auth_tokens WHERE expires_at > EXTRACT(EPOCH FROM NOW()) * 1000 LIMIT 10;
```

## Support

- GitHub Repository: https://github.com/MolochDaGod/grudge-studio-battle-arena
- Vercel Documentation: https://vercel.com/docs
- Neon Documentation: https://neon.tech/docs
- Crossmint Documentation: https://docs.crossmint.com
