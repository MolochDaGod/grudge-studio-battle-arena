# 🚀 Quick Start Guide

Get the Grudge Studio Battle Arena running in 5 minutes!

## Step 1: Install Dependencies

Open two terminal windows.

**Terminal 1 (Server):**
```bash
cd E:\GrudgeDefense\grudge-studio-battle-arena\server
npm install
```

**Terminal 2 (Client):**
```bash
cd E:\GrudgeDefense\grudge-studio-battle-arena\client
npm install
```

## Step 2: Start the Server

**In Terminal 1:**
```bash
npm run dev
```

Wait for: `🚀 Server running on http://localhost:2567`

## Step 3: Start the Client

**In Terminal 2:**
```bash
npm run dev
```

Your browser should open automatically to `http://localhost:3000`

## Step 4: Play!

1. Enter your warrior name
2. Click "START BATTLE"
3. Use arrow keys to move
4. Click mouse to shoot
5. Eliminate enemies!

## Testing Multiplayer

Open multiple browser tabs/windows to `http://localhost:3000` to simulate multiple players!

## Next Steps

- Read the full [README.md](README.md) for deployment instructions
- Customize game assets and rules
- Deploy to Vercel (client) and Railway/Render (server)

---

**Having issues?** Make sure:
- Node.js 18+ is installed
- Ports 2567 and 3000 are available
- Both server and client are running
