# Build Stage
FROM node:18-alpine as build

WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Versuche zuerst npm ci, falle zurück auf npm install wenn es fehlschlägt
RUN npm ci || npm install

# Optional: Füge @rollup/rollup-linux-x64-gnu als optionale Abhängigkeit hinzu
RUN npm install @rollup/rollup-linux-x64-gnu@4.9.5 --save-optional

# Kopiere den Rest des Projektcodes
COPY . .

# Baue die Anwendung
RUN npm run build

# Production Stage
FROM node:18-alpine

WORKDIR /app

# Kopiere die gebaute Anwendung und notwendige Dateien
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .

# Installiere Produktionsabhängigkeiten
RUN npm ci --only=production || npm install --only=production

# Exponiere den Port, auf dem die Anwendung läuft
EXPOSE 5173

# Starte die Anwendung
CMD ["node", "build"]