#!/bin/sh
cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  VITE_BACKEND_HOST: "${VITE_BACKEND_HOST}",
  VITE_BACKEND_PORT: "${VITE_BACKEND_PORT}",
  VITE_GRAFANA_HOST: "${VITE_GRAFANA_HOST}"
};
EOF
