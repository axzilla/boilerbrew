# SvelteKit and PocketBase Boilerplate

This boilerplate provides a starting point for building a web application with SvelteKit and PocketBase.

## Environment Variables

This project uses environment variables for configuration. The main variables to set are:

- `PUBLIC_PB_URL`: The URL of your PocketBase instance.
- `ORIGIN`: The URL of your frontend application, used for CORS configuration in PocketBase.

### Local Development

For local development, create a `.env` file in the root directory with:

```
# Public / Client
PUBLIC_PB_URL=http://localhost:8090
ORIGIN=http://localhost:5173 # Origin for CORS
```

### Production Deployment

When deploying to production:

1. Do not commit your `.env` file to version control.
2. Set the environment variables in your hosting platform (e.g., Coolify).
3. Update the values to reflect your production environment:

   ```
   PUBLIC_PB_URL=https://api.your-production-domain.com
   ORIGIN=https://your-production-domain.com
   ```

   Replace `https://api.your-production-domain.com` and `https://your-production-domain.com` with your actual production URLs.

#### Setting Environment Variables in Coolify

To set environment variables in Coolify:

1. Go to your project's dashboard in Coolify.
2. Navigate to the 'Settings' or 'Environment Variables' section.
3. Add each variable (`PUBLIC_PB_URL` and `ORIGIN`) with its corresponding production value.
4. Save the changes and redeploy your application.

## Docker Compose Configuration

The `docker-compose.yml` file is configured to allow flexibility in setting the `PUBLIC_PB_URL`:

```yaml
environment:
  - PUBLIC_PB_URL=${PUBLIC_PB_URL:-http://backend:8080}
```

This configuration means:

- If `PUBLIC_PB_URL` is set in the environment (e.g., in Coolify), that value will be used.
- If not set, it defaults to `http://backend:8080`, which works for local development and simple deployments.

This approach provides flexibility for different hosting scenarios while maintaining ease of use for local development.

## Development

To run the project locally:

1. Ensure you have a `.env` file set up as described in the Local Development section.
2. Start PocketBase:
   ```
   cd backend
   ./pocketbase serve
   ```
3. In another terminal, start the SvelteKit dev server:
   ```
   cd web
   npm run dev
   ```

## Production

When deploying to production:

1. Ensure your hosting platform (e.g., Coolify) has the correct environment variables set:
   - Set `ORIGIN` to your frontend's URL.
   - Set `PUBLIC_PB_URL` to your PocketBase instance's URL if hosting PocketBase separately. If not set, it will use the default Docker network configuration.
2. Deploy your application according to your hosting platform's instructions.

Remember to secure your application properly before exposing it to the internet!

## Docker and Architecture Considerations

This boilerplate supports both AMD64 and ARM architectures. The PocketBase Dockerfile allows you to manually specify the architecture.

### PocketBase Dockerfile

The `backend/Dockerfile` is configured as follows:

```dockerfile
FROM alpine:latest
ARG PB_VERSION=0.22.19
# Change this line to switch between amd64 and arm64
ARG PB_ARCH=arm64
RUN apk add --no-cache \
    unzip \
    ca-certificates
# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${PB_ARCH}.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations
# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks
EXPOSE 8080
# start PocketBase
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8080"]
```

### Changing the Architecture

To change the architecture:

1. Open the `backend/Dockerfile`
2. Locate the following line:
   ```
   ARG PB_ARCH=arm64
   ```
3. Change `arm64` to `amd64` if you need to use the AMD64 architecture, or vice versa.
4. Save the file and rebuild your Docker image.

### Building for Different Architectures

To build the Docker image:

```bash
docker build -t pocketbase-backend ./backend
```

Note that the image will be built for the architecture specified in the Dockerfile. Make sure this matches your deployment environment.

## Customizing for Your Project

1. Modify the SvelteKit app in the `web` directory to fit your project needs.
2. Adjust the PocketBase configuration and migrations in the `backend` directory as required.
3. Update this README to include any project-specific instructions or information.

## PocketBase Configuration

### Data Persistence

- The PocketBase data is persisted in a Docker volume named `pocketbase_data`.

### Migrations and Hooks

PocketBase supports two important features for database management and customization: migrations and hooks.

#### pb_migrations

- These are database migrations for PocketBase.
- They allow versioning and automating changes to the database structure.
- Migrations can be used to create, modify, or delete collections, as well as insert initial data.

#### pb_hooks

- Hooks are custom JavaScript functions that run at specific points in the PocketBase lifecycle.
- They allow extending and customizing PocketBase functionality.
- Examples include running code before or after creating a record, authenticating a user, or creating custom API endpoints.

### Configuring Migrations and Hooks in Docker

In the `backend/Dockerfile`, you'll find these lines:

```dockerfile
# uncomment to copy the local pb_migrations dir into the image
# COPY ./pb_migrations /pb/pb_migrations
# uncomment to copy the local pb_hooks dir into the image
# COPY ./pb_hooks /pb/pb_hooks
```

#### When to Keep These Lines Commented Out:

1. During initial development when you're frequently changing migrations or hooks.
2. If you prefer to mount these directories as volumes for easier development and testing.
3. When you want to manage migrations and hooks separately from your Docker image.

#### When to Uncomment These Lines:

1. For production deployments where you want to ensure all necessary configurations are included in the image.
2. When creating a self-contained image that includes all required setup.
3. If you want to version control your migrations and hooks along with your application code.

### Using Migrations and Hooks

To use these features:

1. Create the corresponding directories in your project:

   ```
   backend/
   ├── pb_migrations/
   └── pb_hooks/
   ```

2. Add your migration files or hook scripts to these directories.

3. If you decide to include them in your Docker image, uncomment the relevant lines in the Dockerfile.

### Best Practices

- Use migrations to version your database schema changes.
- Implement hooks for custom business logic or integrations.
- During development, consider mounting these directories as volumes for easier iteration.
- For production, include stable migrations and hooks in your Docker image for consistency across deployments.

Remember, whether you include these in your Docker image or mount them as volumes, ensure that your approach aligns with your development workflow and deployment strategy.

## Security Considerations

- Never store sensitive information (like API keys or database passwords) in your Docker files or commit them to version control.
- Use environment variables for all sensitive information and secrets.
- Regularly update dependencies and Docker base images to patch security vulnerabilities.

## Troubleshooting

If you encounter CORS issues:

1. Ensure the `ORIGIN` environment variable is correctly set in both development and production.
2. Check that your PocketBase configuration allows requests from the specified origin.

For any other issues, please check the logs of both the SvelteKit and PocketBase services.
