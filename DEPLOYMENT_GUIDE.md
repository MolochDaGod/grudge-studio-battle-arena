# Grudge Studio Battle Arena - Deployment Guide

## Prerequisites
1. GitHub account (✅ Already created: https://github.com/MolochDaGod/grudge-studio-battle-arena)
2. Vercel account (sign up at https://vercel.com)
3. MySQL database (Grudge Game DB)
   - Host: 74.208.155.229
   - Port: 3306
   - Database: grudge_game
4. Crossmint API key (optional, for wallet features)

## Database Setup

### 1. Run Database Migration
Connect to your MySQL database and run the migration:

```bash
# Connect to MySQL database
mysql -h 74.208.155.229 -P 3306 -u grudge_admin -p grudge_game
# Enter password: Grudge2026!

# Or use a MySQL client/GUI tool
```

The migration creates the `battle_arena_stats` table:
```sql
CREATE TABLE IF NOT EXISTS battle_arena_stats (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  account_id CHAR(36) NOT NULL,
  total_kills BIGINT DEFAULT 0,
  total_deaths BIGINT DEFAULT 0,
  total_matches BIGINT DEFAULT 0,
  total_playtime_minutes INT DEFAULT 0,
  highest_killstreak INT DEFAULT 0,
  created_at BIGINT NOT NULL,
  updated_at BIGINT NOT NULL,
  FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
  INDEX idx_battle_arena_stats_account (account_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### 2. Verify Database Schema
Ensure your MySQL database has these tables:
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
- `DB_HOST` - MySQL host (74.208.155.229)
- `DB_PORT` - MySQL port (3306)
- `DB_NAME` - Database name (grudge_game)
- `DB_USER` - Database user (grudge_admin)
- `DB_PASSWORD` - Database password
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
DB_HOST=74.208.155.229
DB_PORT=3306
DB_NAME=grudge_game
DB_USER=grudge_admin
DB_PASSWORD=Grudge2026!
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
DB_HOST=74.208.155.229
DB_PORT=3306
DB_NAME=grudge_game
DB_USER=grudge_admin
DB_PASSWORD=Grudge2026!
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
- Verify MySQL host/port/credentials are correct
- Check MySQL server is accessible
- Ensure firewall allows connection from Vercel IPs

### Authentication Not Working
- Check MySQL credentials are correct
- Verify database migration was run
- Check server logs for database errors
- Ensure `users`, `accounts`, and `auth_tokens` tables exist

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
Use MySQL client or GUI tool to check:
```sql
-- Check users
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- Check battle arena stats
SELECT * FROM battle_arena_stats ORDER BY updated_at DESC LIMIT 10;

-- Check active tokens
SELECT * FROM auth_tokens WHERE expires_at > UNIX_TIMESTAMP() * 1000 LIMIT 10;
```

## Support

- GitHub Repository: https://github.com/MolochDaGod/grudge-studio-battle-arena
- Vercel Documentation: https://vercel.com/docs
- MySQL Documentation: https://dev.mysql.com/doc/
- Crossmint Documentation: https://docs.crossmint.com
