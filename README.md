# ⚔️ Grudge Studio Battle Arena

A modernized multiplayer battle royale game built with Phaser 3 and Colyseus. Fight for survival in an arena where only one warrior can reign supreme!

## 🎮 Game Features

- **Real-time Multiplayer**: Battle against other players in real-time
- **Battle Royale Mechanics**: Last player standing wins
- **Smooth Controls**: Arrow keys for movement, mouse for aiming and shooting
- **Kill Tracking**: Track your eliminations and compete for the top spot
- **Respawn System**: Get back in the action quickly
- **Modern UI**: Clean, responsive interface with death screens and menus

## 🏗️ Tech Stack

### Client
- **Phaser 3.80+**: Modern HTML5 game framework
- **Colyseus Client**: Real-time multiplayer networking
- **Vite**: Fast build tool and dev server

### Server
- **Colyseus 0.15+**: Authoritative multiplayer game server
- **Node.js 18+**: Server runtime
- **Express**: Web server framework

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Setup

1. **Clone or navigate to the project**
   ```bash
   cd grudge-studio-battle-arena
   ```

2. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd ../server
   npm install
   ```

## 🚀 Running Locally

### Start the Server
```bash
cd server
npm run dev
```
The server will start on `http://localhost:2567`
- Monitor: `http://localhost:2567/colyseus`

### Start the Client
In a new terminal:
```bash
cd client
npm run dev
```
The client will start on `http://localhost:3000`

### Configuration
Create a `.env` file in the `client` directory:
```env
VITE_SERVER_URL=ws://localhost:2567
```

## 🌐 Deployment

### Deploy Client to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy the client**
   ```bash
   cd client
   vercel
   ```

3. **Set environment variable in Vercel**
   - Go to your Vercel project settings
   - Add environment variable: `VITE_SERVER_URL` with your server URL
   - Redeploy

### Deploy Server

**Important**: The Colyseus server requires persistent WebSocket connections, which aren't ideal for Vercel serverless functions. We recommend deploying the server to one of these platforms:

#### Option 1: Railway.app (Recommended)
1. Create account at [railway.app](https://railway.app)
2. Create new project from GitHub
3. Connect your server code
4. Railway will auto-detect Node.js and deploy
5. Copy the provided URL (e.g., `wss://your-app.railway.app`)

#### Option 2: Render.com
1. Create account at [render.com](https://render.com)
2. New Web Service → Connect repository
3. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `server`
4. Deploy and copy the URL

#### Option 3: Fly.io
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. In server directory: `fly launch`
3. Follow prompts to deploy
4. Copy the provided URL

#### Option 4: Heroku
1. Install Heroku CLI
2. In server directory:
   ```bash
   heroku create your-app-name
   git subtree push --prefix server heroku main
   ```

### Update Client with Server URL

After deploying the server, update your Vercel environment:
1. Go to Vercel project settings
2. Update `VITE_SERVER_URL` to your server URL
3. Use `wss://` protocol for production (secure WebSocket)
4. Redeploy the client

Example: `VITE_SERVER_URL=wss://grudge-arena.railway.app`

## 🎯 How to Play

1. **Enter Your Name**: Type your warrior name in the menu
2. **Start Battle**: Click "START BATTLE" to join the arena
3. **Movement**: Use arrow keys to move your warrior
4. **Aim**: Move your mouse to aim
5. **Shoot**: Click to fire bullets
6. **Survive**: Eliminate other players while avoiding their bullets
7. **Respawn**: If eliminated, click "RESPAWN" to rejoin

## 🛠️ Development

### Project Structure
```
grudge-studio-battle-arena/
├── client/                 # Frontend game client
│   ├── src/
│   │   ├── scenes/        # Phaser game scenes
│   │   │   └── GameScene.js
│   │   └── main.js        # Entry point
│   ├── index.html         # HTML template
│   ├── vite.config.js     # Vite configuration
│   └── package.json
│
└── server/                # Backend game server
    ├── rooms/             # Colyseus rooms
    │   ├── schema/        # Game state schemas
    │   │   └── GameState.js
    │   └── BattleArenaRoom.js
    ├── index.js           # Server entry point
    └── package.json
```

### Building for Production

**Client:**
```bash
cd client
npm run build
```
Output will be in `client/dist/`

**Server:**
```bash
cd server
npm start
```

## 🎨 Customization

### Adding Custom Assets
Replace the placeholder graphics in `GameScene.js` with your own sprites:
1. Add image files to `client/src/assets/`
2. Update the `preload()` method to load your assets
3. Update sprite references in the code

### Modifying Game Rules
Edit `server/rooms/BattleArenaRoom.js`:
- `WORLD_SIZE`: Change arena size
- `MAX_BULLET_DISTANCE`: Adjust bullet range
- `BULLET_HIT_RADIUS`: Modify hit detection
- `SPAWN_POSITIONS`: Add/modify spawn points

## 📝 License

MIT

## 🙏 Credits

Built with ❤️ by Grudge Studio

Original concept inspired by Battle Arena by ArnolFokam, Wil2129, and alexjordan05

Powered by:
- [Phaser](https://phaser.io/)
- [Colyseus](https://colyseus.io/)
- [Vite](https://vitejs.dev/)

---

**Enjoy the battle! May the best warrior win! ⚔️**
