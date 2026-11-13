# Cypress JavaScript Automation Framework

Proof of work repository demonstrating test automation capabilities with Cypress.

## Stack
- **Cypress** - E2E testing framework
- **TypeScript** - Type-safe tests
- **cypress-plugin-api** - API testing
- **Docker** - Containerized execution
- **GitHub Actions** - CI/CD pipeline

## Project Structure
```
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.ts           # Login flow tests
│   │   ├── api.cy.ts             # API tests
│   │   └── ui.cy.ts              # UI interaction tests
│   ├── support/
│   │   ├── commands.ts           # Custom commands
│   │   ├── e2e.ts               # Global config
│   │   └── page-objects/
│   │       ├── basePage.ts       # Base page object
│   │       └── loginPage.ts      # Login page object
│   ├── fixtures/
│   │   └── users.json           # Test data
│   └── downloads/               # Downloaded files
├── cypress.config.ts            # Cypress configuration
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .github/
│   └── workflows/
│       └── test.yml             # CI pipeline
└── cypress.env.json.example     # Environment template
```

## Quick Start

### Local (with Docker)
```bash
cd docker
docker-compose up --build
```

### Local (without Docker)
```bash
npm ci
npx cypress open        # Interactive mode
npx cypress run         # Headless CI mode
```

### Run specific test
```bash
npx cypress run --spec "cypress/e2e/login.cy.ts"
npx cypress run --env BROWSER=firefox
```

## CI/CD
GitHub Actions workflow (`.github/workflows/test.yml`) runs on:
- Push to main
- Pull requests
- Schedule (daily)

Generates:
- Mochawesome HTML report
- JUnit XML
- Screenshots/videos on failure

## Configuration
Environment variables (`cypress.env.json`):
```json
{
  "baseUrl": "https://example.com",
  "viewportWidth": 1280,
  "viewportHeight": 720,
  "video": true,
  "screenshotOnRunFailure": true
}
```

## Proof of Competencies Demonstrated
- ✅ Cypress TypeScript API (commands, assertions, retries)
- ✅ Page Object Model pattern
- ✅ Custom Cypress commands
- ✅ API testing with cy.request()
- ✅ Network interception (cy.intercept)
- ✅ Docker containerization
- ✅ CI/CD with GitHub Actions
- ✅ Cross-browser (Chrome, Firefox, Edge)
- ✅ Parallel execution
- ✅ Screenshots, videos, traces on failure
- ✅ Component testing ready