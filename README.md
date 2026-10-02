# Number Guess – frontend

Webbappen låter dig skapa en spelare, starta ett spel och gissa ett hemligt tal mellan 1 och 5. Du kan också visa och hantera spelare, spel och gissningar. Frontend använder backendens API för att spara och hämta information.

### KörningStarta hela spelet lokalt

Du behöver Docker. Öppna terminalen i projektmappen som innehåller `docker-compose.yml` och kör:

```sh
docker compose up --build -d
```

Detta startar frontend, backend och MySQL. MySQL skapar databasen automatiskt. Öppna spelet på [http://localhost:8081](http://localhost:8081).

Docker bygger frontend och backend från källkoden. Du behöver alltså inte ladda ner färdiga app-images eller skapa databasen själv.

### Starta bara frontend

Om backend redan kör på `http://localhost:8080` kan du starta frontend separat. Kör från frontendmappen:

```sh
docker build -t number-guess-frontend .
docker run --rm -p 8081:8081 \
  -e API_BASE_URL=http://localhost:8080 \
  number-guess-frontend
```

Öppna [http://localhost:8081](http://localhost:8081). Backendadressen måste gå att nå från webbläsaren.

## Köra tester

För testerna behöver du Node.js 22, npm och Docker. Kör kommandona från frontendmappen. De startar spelets tjänster, kör testerna och stänger sedan tjänsterna:

```sh
npm ci
npx playwright install chromium
docker compose -f ../docker-compose.yml up --build -d --wait
npx playwright test
docker compose -f ../docker-compose.yml down
```

## CI/CD

GitHub Actions testar ändringar som pushas till, eller skickas som pull request mot, `dev` och `main`. Flödet bygger frontend, kontrollerar att webbservern startar och kör E2E-tester med hela spelet. Om testerna misslyckas sparas en testrapport.

När kod pushas till `dev` eller `main` byggs en Docker-image och skickas till Docker Hub. Sedan ber GitHub Actions Railway att starta om rätt frontend-tjänst:

| Branch | Railway-tjänst | Miljö |
|---|---|---|
| `dev` | `frontend-dev` | `dev` |
| `main` | `frontend-main` | `production` |

Tester och driftsättning är separata flöden. En pull request kör tester men startar inte driftsättning.

## Live-länkar

- **Development:** (https://number-guess-frontend-dev.up.railway.app/)
- **Production:** (https://ng-frontend-main-production.up.railway.app/)


### Github repository
- **Frontend**(https://github.com/moodyambr/number-guess-frontend.git)
- **Backend**(https://github.com/moodyambr/-number-guess-backend.git)