# SvelteKit and PocketBase Boilerplate

This boilerplate provides a starting point for building a web application with SvelteKit and PocketBase.

## Development

1. Clone this repository
2. Run `docker-compose -f docker-compose.dev.yml up --build`
3. Access the SvelteKit app at `http://localhost:3000` and PocketBase admin at `http://localhost:8090/_/`

## Production

1. Ensure you have Docker and Docker Compose installed on your server
2. Clone this repository on your server
3. Run `docker-compose up -d --build`
4. Your app should now be running. Access the SvelteKit app at `http://your-server-ip:3000` and PocketBase admin at `http://your-server-ip:8090/_/`

## Deploying to Coolify

1. Set up a new project in Coolify
2. Connect your Git repository
3. In the Coolify dashboard, set up two services:
   - For the backend: Use the Dockerfile in the `/backend` directory
   - For the web: Use the Dockerfile in the `/web` directory
4. Set the necessary environment variables in Coolify, including `PUBLIC_PB_URL`
5. Deploy your application

Remember to secure your application properly before exposing it to the internet!

## Environment Variables

- `PUBLIC_PB_URL`: The URL of your PocketBase instance. In development, this is typically `http://localhost:8090`. In production, you should set this to the actual URL of your PocketBase instance.

## PocketBase Configuration

- The PocketBase data is persisted in a Docker volume named `pocketbase_data`.
- In development mode, `pb_migrations` and `pb_hooks` directories are mounted from your local `backend` directory into the container. This allows for easy development and testing of migrations and hooks.
- To use migrations or hooks in production, uncomment the relevant COPY lines in the backend Dockerfile.
