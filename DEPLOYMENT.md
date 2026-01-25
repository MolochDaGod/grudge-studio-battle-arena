# 🌐 Deployment Guide - Grudge Studio Battle Arena

Complete step-by-step guide to deploy your game to production.

## Overview

- **Client**: Deploy to Vercel (static hosting)
- **Server**: Deploy to Railway, Render, or Fly.io (Node.js hosting with WebSocket support)

---

## Part 1: Deploy the Server

### Option A: Railway.app (Easiest - Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your repositories
   - Select your repository

3. **Configure Service**
   - Railway auto-detects Node.js
   - Set root directory: `server`
   - Click "Deploy Now"

4. **Get Your Server URL**
   - Go to "Settings" → "Networking"
   - Click "Generate Domain"
   - Copy the domain (e.g., `your-app.railway.app`)
   - Your WebSocket URL will be: `wss://your-app.railway.app`

5. **Environment Variables** (Optional)
   - In Railway dashboard → Variables
   - Add `PORT` if needed (Railway auto-assigns)

### Option B: Render.com

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **New Web Service**
   - Dashboard → "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: grudge-arena-server
     - **Root Directory**: `server`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

4. **Get Your URL**
   - Copy the URL from dashboard (e.g., `grudge-arena-server.onrender.com`)
   - Your WebSocket URL: `wss://grudge-arena-server.onrender.com`

### Option C: Fly.io

1. **Install Fly CLI**
   ```bash
   # Windows (PowerShell)
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   
   # Mac/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Sign Up and Login**
   ```bash
   fly auth signup
   # OR
   fly auth login
   ```

3. **Deploy Server**
   ```bash
   cd server
   fly launch
   ```
   
   Follow the prompts:
   - Choose app name (e.g., `grudge-arena-server`)
   - Select region closest to your players
   - Don't deploy PostgreSQL database
   - Deploy now? Yes

4. **Get Your URL**
   - After deployment, Fly provides URL: `grudge-arena-server.fly.dev`
   - WebSocket URL: `wss://grudge-arena-server.fly.dev`

---

## Part 2: Deploy the Client to Vercel

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy Client

```bash
cd E:\GrudgeDefense\grudge-studio-battle-arena\client
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? `grudge-studio-battle-arena`
- Directory? `.` (current directory)
- Override settings? **No**

### Step 4: Configure Environment Variable

After initial deployment:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_SERVER_URL`
   - **Value**: `wss://your-server-url-from-part1.com`
   - **Environment**: Production, Preview, Development

Example values:
- Railway: `wss://grudge-arena.railway.app`
- Render: `wss://grudge-arena-server.onrender.com`
- Fly.io: `wss://grudge-arena-server.fly.dev`

### Step 5: Redeploy

```bash
vercel --prod
```

OR trigger redeploy from Vercel dashboard.

---

## Part 3: Testing Your Deployment

1. **Visit Your Client URL**
   - Vercel provides URL: `https://grudge-studio-battle-arena.vercel.app`
   - Should see the game menu

2. **Test Multiplayer**
   - Open 2-3 browser tabs
   - Enter different names
   - Start battle
   - Verify players can see each other and interact

3. **Check Server Status**
   - Visit: `https://your-server-url/health`
   - Should return: `{"status":"ok","timestamp":...}`
   - Visit: `https://your-server-url/colyseus`
   - Should show Colyseus monitor

---

## Part 4: Custom Domain (Optional)

### For Vercel (Client)

1. Go to Vercel dashboard → Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Vercel auto-provisions SSL

### For Server

Each platform has domain management:
- **Railway**: Settings → Networking → Custom Domain
- **Render**: Dashboard → Custom Domain
- **Fly.io**: `fly certs add yourdomain.com`

---

## Troubleshooting

### Client can't connect to server

**Issue**: WebSocket connection fails

**Solutions**:
1. Check `VITE_SERVER_URL` is set correctly in Vercel
2. Ensure using `wss://` (not `ws://`) in production
3. Verify server is running (check health endpoint)
4. Check browser console for errors

### Server crashes or doesn't start

**Solutions**:
1. Check server logs in hosting dashboard
2. Verify `package.json` has correct Node version
3. Ensure all dependencies installed
4. Check port configuration

### Players can't see each other

**Solutions**:
1. Open browser console on both clients
2. Verify both connected to same room
3. Check Colyseus monitor for active rooms
4. Restart server if needed

---

## Monitoring

### Server Monitoring

**Railway**:
- Dashboard → Metrics
- View CPU, Memory, Network

**Render**:
- Dashboard → Logs
- Real-time log streaming

**Fly.io**:
```bash
fly logs
fly status
```

### Colyseus Monitor

Access at: `https://your-server-url/colyseus`

Monitor:
- Active rooms
- Connected clients
- Room state
- Performance metrics

---

## Updating Your Game

### Update Client

```bash
cd client
# Make changes
vercel --prod
```

### Update Server

**Railway/Render**: Push to GitHub (auto-deploys)

**Fly.io**:
```bash
cd server
fly deploy
```

---

## Cost Estimates

### Free Tier Limits

**Vercel (Client)**:
- 100 GB bandwidth/month
- Unlimited requests
- Free SSL
- **Cost**: $0

**Railway (Server)**:
- $5 free credit/month
- ~500 hours runtime
- **Cost**: Free initially

**Render (Server)**:
- Free tier with limitations
- Spins down after inactivity
- **Cost**: $0 (may need paid tier for 24/7)

**Fly.io (Server)**:
- Free allowances
- 3 shared-cpu VMs
- **Cost**: Free within limits

---

## Production Best Practices

1. **Enable HTTPS**: Always use `wss://` for production
2. **Monitor Usage**: Check bandwidth and server metrics
3. **Error Logging**: Implement error tracking (Sentry, LogRocket)
4. **Rate Limiting**: Add on server to prevent abuse
5. **Backups**: Keep your code in version control
6. **Testing**: Test locally before deploying
7. **Scaling**: Upgrade hosting plans as player base grows

---

## Support

**Issues with deployment?**
- Check server logs
- Review environment variables
- Test locally first
- Verify all URLs are correct

**Need help?**
- Hosting Platform Docs
  - [Railway Docs](https://docs.railway.app)
  - [Render Docs](https://render.com/docs)
  - [Fly.io Docs](https://fly.io/docs)
  - [Vercel Docs](https://vercel.com/docs)

---

**🎮 Happy Deploying! May your server stay online and your battles be epic! ⚔️**
