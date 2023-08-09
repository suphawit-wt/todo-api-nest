# Todo API Nest.js

This project implements a Todo API using Nest.js with MySQL, TypeORM for ORM and migrations, and JWT for authentication.

## Table of Contents

- [Development](#development)
	- [Configuration](#configuration)
    - [Setup](#setup)
    - [Testing](#testing)
    - [Linting](#linting)
    - [URL](#url)
- [Deployment](#deployment)
	- [Build Production Image](#build-production-image)
    - [Run Docker Container](#run-docker-container)
- [License](#license)


## Development

### Configuration

Copy the `.env.example` file to a new file named `.env`, and then set the environment configuration in the `.env` file.
```bash
cp .env.example .env
```

### Setup
1. Using Docker Compose to initialize the project:
```bash
docker compose up -d
```

2. Start a terminal session in the app container
```bash
docker compose exec app bash
```

3. Install dependencies for development
```bash
pnpm install --frozen-lockfile
```

4. Run migrations
```bash
pnpm migration:run
```

5. Start the server for development
```bash
pnpm start:dev
```

### Testing
Run the test suite using:
```bash
pnpm test
```

### Linting
Check code quality with:
```bash
pnpm lint
```

### URL
- **Swagger:** [http://localhost:3000/swagger](http://localhost:3000/swagger)

## Deployment

### Build Production Image
```bash
docker build -t todo-api-nest:1.0.0 .
```

### Run Docker Container
```bash
docker run --name todo-api-nest -p 3000:3000 --env-file .env -d todo-api-nest:1.0.0
```

## License

Distributed under the MIT License. See [LICENSE](../LICENSE) for more information.