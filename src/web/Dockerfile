# Build Stage
FROM node:18-alpine as build
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Try npm ci first, fall back to npm install if it fails
RUN npm ci || npm install
# Optional: Add @rollup/rollup-linux-x64-gnu as an optional dependency
RUN npm install @rollup/rollup-linux-x64-gnu@4.9.5 --save-optional
# Copy the rest of the project code
COPY . .
# Build the application
RUN npm run build

# Production Stage
FROM node:18-alpine
WORKDIR /app
# Copy the built application and necessary files
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
# Install production dependencies
RUN npm ci --only=production || npm install --only=production
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["node", "build"]