# SvelteKit and PocketBase Boilerplate

A comprehensive starting point for building modern web applications with SvelteKit frontend and PocketBase backend.

## Features

- SvelteKit for a powerful, performant frontend
- PocketBase for a flexible, easy-to-use backend
- Docker support for easy deployment
- Tailwind CSS for rapid UI development
- Authentication system pre-configured
- CRUD operations demo included

## TODO

- [ ] Stripe Integration (WIP):
  - Connect with Stripe API
  - Implement subscription plans
  - Add payment processing
  - Handle webhooks

## Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```
2. Set up environment variables:
   Create a `.env` file in the root directory:
   ```
   PUBLIC_PB_URL=http://localhost:8090
   ORIGIN=http://localhost:5173
   ```
3. Start PocketBase:
   ```
   cd backend
   ./pocketbase serve
   ```
4. In a new terminal, start the SvelteKit dev server:
   ```
   cd web
   npm install
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## Deployment

We recommend using Hetzner with Coolify for straightforward deployment:

1. Set up a Hetzner server and install Coolify (refer to Coolify docs for installation).
2. In Coolify:
   - Connect your GitHub repository.
   - Choose Docker Compose as the deployment method.
   - Set environment variables:
     ```
     PUBLIC_PB_URL=https://api.your-domain.com
     ORIGIN=https://your-domain.com
     ```
   - Link your domains for API (PocketBase) and frontend (SvelteKit).
3. Deploy your application through Coolify's interface.

### Manual Deployment

If not using Coolify, you can deploy manually:

1. SSH into your server.
2. Clone your repository.
3. Set up environment variables.
4. Run `docker-compose up -d` in the project root.

## Docker and Architecture

- The project supports both AMD64 and ARM architectures.
- To change architecture, modify `ARG PB_ARCH=arm64` in `backend/Dockerfile`.
- Build the Docker image: `docker build -t pocketbase-backend ./backend`

## PocketBase Configuration

- Data is persisted in a Docker volume named `pocketbase_data`.
- For database migrations, use the `pb_migrations` directory.
- For custom hooks, use the `pb_hooks` directory.
- Access the PocketBase admin panel at `http://localhost:8090/_/` during local development.

## Customization

- Modify SvelteKit components in the `web/src` directory.
- Adjust PocketBase settings through the admin panel or `pb_migrations`.
- Add new API endpoints in PocketBase using `pb_hooks`.

## Security Best Practices

- Use environment variables for all sensitive information.
- Regularly update dependencies and Docker images.
- Enable HTTPS in production.
- Implement proper authentication and authorization in your app.

## Troubleshooting

- Verify all environment variables are set correctly.
- Check CORS settings if you encounter API issues.
- Review logs for both SvelteKit and PocketBase services:
  ```
  docker-compose logs -f
  ```
  For more advanced issues, please consult the project's GitHub issues or create a new one.

## Further Documentation

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [PocketBase Documentation](https://pocketbase.io/docs/)
- [Coolify Documentation](https://coolify.io/docs)
- [Hetzner Cloud Documentation](https://docs.hetzner.com/)
  For any questions not covered here, feel free to open an issue in the GitHub repository.
