# SvelteKit and PocketBase Boilerplate

This boilerplate provides a starting point for building a web application with SvelteKit and PocketBase.

## PocketBase Configuration

The PocketBase Dockerfile is set up for a specific architecture. By default, it's configured for `amd64`. If you need to use a different architecture (e.g., `arm64`), you'll need to manually modify the Dockerfile.

### Changing the PocketBase Architecture

To change the architecture:

1. Open the `backend/Dockerfile`
2. Locate the following line:
   ```
   ARG PB_ARCH=amd64
   ```
3. Change `amd64` to your desired architecture (e.g., `arm64`)
4. Save the file and rebuild the Docker image

Example for arm64:

```
ARG PB_ARCH=arm64
```

Make sure to use the appropriate architecture for your system.

## Development

1. Clone this repository
2. If necessary, change the PocketBase architecture as described above
3. Build the images: `docker-compose build`
4. Run `docker-compose up -d`
5. Access the SvelteKit app at `http://localhost:3000` and PocketBase admin at `http://localhost:8090/_/`

## Production

1. Ensure you have Docker and Docker Compose installed on your server
2. Clone this repository on your server
3. If necessary, change the PocketBase architecture as described above
4. Build the images: `docker-compose build`
5. Run `docker-compose up -d`
6. Your app should now be running. Access the SvelteKit app at `http://your-server-ip:3000` and PocketBase admin at `http://your-server-ip:8090/_/`

## Deploying to Coolify

1. Set up a new project in Coolify
2. Connect your Git repository
3. If necessary, change the PocketBase architecture in the Dockerfile before deploying
4. In the Coolify dashboard, set up two services:
   - For the backend: Use the Dockerfile in the `/backend` directory
   - For the web: Use the Dockerfile in the `/web` directory
5. Set the necessary environment variables in Coolify, including `PUBLIC_PB_URL`
6. Deploy your application

Remember to secure your application properly before exposing it to the internet!

## Environment Variables

- `PUBLIC_PB_URL`: The URL of your PocketBase instance. In development, this is typically `http://localhost:8090`. In production, you should set this to the actual URL of your PocketBase instance.
