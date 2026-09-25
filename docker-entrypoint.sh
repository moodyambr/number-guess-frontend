#!/bin/sh
set -e

# Railway (och andra PaaS) injicerar PORT vid runtime. Default till 8081 lokalt.
export PORT="${PORT:-8081}"
# API_BASE_URL pekar mot backend-tjänsten (separat Railway-service/container).
export API_BASE_URL="${API_BASE_URL:-http://localhost:8080}"

# Generera nginx.conf med rätt port
envsubst '${PORT}' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf

# Generera config.js med rätt backend-URL innan nginx startar
cat <<EOF > /usr/share/nginx/html/config.js
window.API_BASE_URL = "${API_BASE_URL}";
EOF

exec nginx -g 'daemon off;'
