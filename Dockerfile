FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package.json ./server/

# Install dependencies for both root and server
RUN npm install

# Copy source code
COPY . .

# Build frontend
RUN npm run build

# Expose port 3000 (Coolify default)
EXPOSE 3000

# Start server
CMD ["node", "server/index.js"]
