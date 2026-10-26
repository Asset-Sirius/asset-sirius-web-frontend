## Multi-stage Dockerfile for building the Vite React frontend and serving with nginx

# --- Builder stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies based on package-lock / package.json
COPY package*.json ./
RUN npm ci --silent

# VITE_* build-time args/ENVs removed — runtime injection now happens via /env.js

# Copy rest of the sources and build
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM nginx:stable-alpine AS runtime

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with SPA-friendly config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script that writes runtime env to /usr/share/nginx/html/env.js
COPY docker-entrypoint.d/40-env.sh /docker-entrypoint.d/40-env.sh
RUN chmod +x /docker-entrypoint.d/40-env.sh

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
