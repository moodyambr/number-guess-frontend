FROM nginx:1.27-alpine

# Statiska frontend-filer
COPY static/ /usr/share/nginx/html/
RUN chmod -R a+rX /usr/share/nginx/html/

# nginx-mall som fylls i med rätt $PORT vid container-start
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template

# Skript som genererar nginx.conf + config.js (API_BASE_URL) vid start
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8081

ENTRYPOINT ["/docker-entrypoint.sh"]
