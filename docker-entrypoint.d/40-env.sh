#!/bin/sh
set -e

ENV_FILE=/usr/share/nginx/html/env.js
HTML_FILE=/usr/share/nginx/html/index.html

# Escapa barras e aspas para o valor poder ser embutido em uma string JS.
escape() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

GRAFANA_HOST=$(escape "${VITE_GRAFANA_HOST}")
INSTANCE_ID=$(escape "${VITE_INSTANCE_ID}")

cat > "$ENV_FILE" <<EOF
window.__ENV__ = {
  VITE_GRAFANA_HOST: "${GRAFANA_HOST}",
  VITE_INSTANCE_ID: "${INSTANCE_ID}"
};
EOF

# O env tambem e injetado inline no HTML: o load balancer pode atender o
# index.html e o env.js em instancias diferentes, e o indicador de instancia
# precisa refletir a instancia que entregou a pagina.
if [ -f "$HTML_FILE" ]; then
  export ENV_LINE="window.__ENV__ = { VITE_GRAFANA_HOST: \"${GRAFANA_HOST}\", VITE_INSTANCE_ID: \"${INSTANCE_ID}\" };"
  # Remove a injecao anterior (o container pode reiniciar sobre o mesmo
  # filesystem) e reinsere o valor atual ao lado do marcador.
  awk '
    /^<script>window\.__ENV__/ { next }
    /<!--runtime-env-->/ { print; print "<script>" ENVIRON["ENV_LINE"] "</script>"; next }
    { print }
  ' "$HTML_FILE" > "$HTML_FILE.tmp"
  mv "$HTML_FILE.tmp" "$HTML_FILE"
fi
