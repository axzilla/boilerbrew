# BoilerBrew

Open-source SaaS starter kit featuring a Law of 100 challenge app, built with SvelteKit + PocketBase.

## 🌟 Overview

BoilerBrew is your starting point for modern web applications, demonstrated through a complete Law of 100 challenge app.

## 🏗 Project Structure

- `src/web`: SvelteKit frontend
- `src/backend`: PocketBase backend
- `website`: Our marketing page (safe to delete)

## ⭐️ Features

- Complete Law of 100 challenge app
- SvelteKit frontend with TailwindCSS
- PocketBase backend with SQLite
- Docker deployment ready
- Authentication system
- CRUD with drag & drop
- Dark/Light mode
- File upload system
- Email integration
- Mobile optimized

## 📋 TODO

- [ ] Stripe Integration (WIP):
  - Payment processing
  - Subscription handling
  - Webhook integration
- [ ] Social Authentication (Coming Soon)
- [ ] Analytics Dashboard (Coming Soon)
- [ ] AI Features (Coming Soon)

## 🚀 Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/boilerbrew.git
   cd boilerbrew
   ```

2. Set up environment:

   ```bash
   # Create .env in src/web
   PUBLIC_PB_URL=http://localhost:8090
   ORIGIN=http://localhost:5173
   ```

3. Start backend:

   ```bash
   cd src/backend
   ./pocketbase serve
   ```

4. Start frontend:

   ```bash
   cd src/web
   npm install
   npm run dev
   ```

5. Open `http://localhost:5173`

## 🌐 Deployment

### Using Coolify (Recommended)

1. Set up on Hetzner
2. Configure in Coolify:
   ```bash
   PUBLIC_PB_URL=https://api.your-domain.com
   ORIGIN=https://your-domain.com
   ```
3. Deploy via Coolify interface

### Manual Deployment

```bash
cd src
docker-compose up -d
```

## 🐳 Docker Support

- Supports AMD64 and ARM
- Modify `ARG PB_ARCH=arm64` in `src/backend/Dockerfile`
- Build: `docker build -t pocketbase-backend ./src/backend`

## 🔧 Configuration

### PocketBase

- Admin panel: `http://localhost:8090/_/`
- Uses `pb_migrations` for schema
- Uses `pb_hooks` for custom logic
- Data in `pocketbase_data` volume

### Frontend

- Components in `src/web/src`
- Uses shadcn-svelte components
- Tailwind for styling
- Superforms for form handling

## 🔒 Security

- Use environment variables
- Keep dependencies updated
- Enable HTTPS in production
- Proper authentication implemented

## 🛠 Troubleshooting

- Check environment variables
- Verify CORS settings
- View logs:
  ```bash
  docker-compose logs -f
  ```

## 📚 Documentation

- [SvelteKit](https://kit.svelte.dev/docs)
- [PocketBase](https://pocketbase.io/docs/)
- [Coolify](https://coolify.io/docs)
- [Hetzner](https://docs.hetzner.com/)

## 💖 Contributing

Issues and PRs welcome!

## 📜 License

MIT

## ⭐️ Support

If you find BoilerBrew helpful, please give it a star!
