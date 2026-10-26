#!/bin/sh
cat > /usr/share/nginx/html/env.js <<EOF
window.__ENV__ = {
  VITE_GRAFANA_HOST: "${VITE_GRAFANA_HOST}"
};
EOF
