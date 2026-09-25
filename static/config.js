// Denna fil genereras vid container-start av docker-entrypoint.sh
// baserat på miljövariabeln API_BASE_URL (satt i Railway/docker-compose).
// Detta är endast en lokal fallback för utveckling utan Docker.
window.API_BASE_URL = "http://localhost:8080";
