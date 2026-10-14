## Multi-stage Dockerfile for building the Vite React frontend and serving with nginx

# --- Builder stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies based on package-lock / package.json
COPY package*.json ./
RUN npm ci --silent

# Copy rest of the sources and build
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM nginx:stable-alpine AS runtime

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with SPA-friendly config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
