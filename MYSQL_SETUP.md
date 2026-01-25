# MySQL Setup Guide - Grudge Battle Arena

## ✅ Database Connection Verified
Your MySQL database at `74.208.155.229:3306` is accessible and ready!

## 📋 Quick Setup Steps

### 1. Create Database Tables
Run the complete schema SQL file to create all necessary tables:

```bash
# Option A: Using MySQL CLI
mysql -h 74.208.155.229 -P 3306 -u grudge_admin -pGrudge2026! grudge_game < server/migrations/000_complete_schema.sql

# Option B: Using MySQL Workbench or another GUI
# 1. Connect to: 74.208.155.229:3306
# 2. Open: server/migrations/000_complete_schema.sql
# 3. Execute the script
```

This creates 4 tables:
- ✅ `users` - User authentication
- ✅ `accounts` - Game accounts with currencies
- ✅ `auth_tokens` - Session management  
- ✅ `battle_arena_stats` - Battle Arena statistics

### 2. Test Database Connection
```bash
cd server
node test-db.cjs
```

Expected output:
```
🔍 Testing MySQL database connection...
✅ Database connection successful!
✅ Users table exists
✅ Accounts table exists  
✅ Auth tokens table exists
✅ Battle arena stats table exists
🎉 All database tests passed!
```

### 3. Start Local Development

**Terminal 1 - Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

Visit: `http://localhost:3000/login.html`

## 🚀 Deploy to Vercel

### Deploy Server:
```bash
cd server
vercel --prod
```

**Add these environment variables in Vercel:**
```
DB_HOST=74.208.155.229
DB_PORT=3306
DB_NAME=grudge_game
DB_USER=grudge_admin
DB_PASSWORD=Grudge2026!
CLIENT_URL=https://your-client-url.vercel.app
SESSION_SECRET=your_random_secret_key
```

### Deploy Client:
```bash
cd client
vercel --prod
```

**Add this environment variable:**
```
VITE_SERVER_URL=wss://your-server-url.vercel.app
```

## 🧪 Test Authentication Flow

1. Visit `/login.html`
2. Click "Register" tab
3. Create account with username/password
4. System will:
   - Create user in MySQL
   - Generate Grudge ID (e.g., `GRUDGE_A1B2C3D4E5F6`)
   - Grant 1000 starter gold
   - Create Crossmint wallet (if API key configured)
   - Return auth token
5. Login and play!

## 📊 Check Database Data

```sql
-- View users
SELECT id, username, created_at FROM users ORDER BY created_at DESC LIMIT 10;

-- View accounts  
SELECT id, user_id, gold, gbux_balance FROM accounts ORDER BY created_at DESC;

-- View active tokens
SELECT user_id, token_type, expires_at FROM auth_tokens WHERE expires_at > UNIX_TIMESTAMP() * 1000;

-- View battle stats
SELECT * FROM battle_arena_stats ORDER BY total_kills DESC LIMIT 10;
```

## 🔧 Common Issues

### "Table doesn't exist"
Run the schema setup SQL again:
```bash
mysql -h 74.208.155.229 -P 3306 -u grudge_admin -pGrudge2026! grudge_game < server/migrations/000_complete_schema.sql
```

### "Connection refused"
Check your network can reach the MySQL server:
```bash
telnet 74.208.155.229 3306
```

### "Authentication failed"
Verify credentials in `.env` file match:
```
DB_PASSWORD=Grudge2026!
```

## 📁 Project Structure
```
grudge-studio-battle-arena/
├── server/
│   ├── db.cjs                    # MySQL connection
│   ├── auth.js                   # Auth helpers
│   ├── routes/
│   │   ├── auth.js              # Login/register/guest
│   │   └── wallet.js            # Crossmint wallets
│   ├── rooms/
│   │   └── BattleArenaRoom.js   # Game room with auth
│   └── migrations/
│       └── 000_complete_schema.sql  # Database setup
├── client/
│   ├── login.html               # Grudge Auth UI
│   └── src/
│       ├── main.js              # Auth check
│       └── scenes/GameScene.js  # Game logic
└── DEPLOYMENT_GUIDE.md          # Full deployment docs
```

## 🎮 Features Implemented

✅ **Unified Authentication**
- Login, Register, Guest modes
- Token-based sessions (7-day expiry)
- MySQL database integration

✅ **Grudge ID System**  
- Unique cross-game identifiers
- Format: `GRUDGE_[12chars]`

✅ **Crossmint Wallets**
- Server-side wallet creation
- Automatic on registration (if API key set)

✅ **Stats Tracking**
- Kills, deaths, playtime
- Saved to MySQL on disconnect
- Persistent across sessions

## 🔗 Resources

- **GitHub:** https://github.com/MolochDaGod/grudge-studio-battle-arena
- **Full Deployment Guide:** `DEPLOYMENT_GUIDE.md`
- **Database Host:** 74.208.155.229:3306
- **Database Name:** grudge_game

---

**Ready to deploy! 🚀**
