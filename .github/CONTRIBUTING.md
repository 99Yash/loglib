# Contributing

Thank you for your interest in contributing to loglib! We welcome contributions from anyone, regardless of their level of experience or background.

### Services

There are few services that are required to run the app:

- **[Planetscale](https://planetscale.com?ref=loglib):** Database // you can also use your own mysql database
- **Clickhouse Database:** you can run clickhouse db locally using docker
  
```sh-session
docker run -d --name clickhouse-server -p 8123:8123 --ulimit nofile=262144:262144 yandex/clickhouse-server
```

You will need to set environment variables in /apps/www/.env and/or /apps/api/.env respectively and populate the values from the services above. You can use the following commands to copy the example files:

```sh-session
cp apps/www/.env.example apps/web/.env
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

### 0. Install

```sh-session
pnpm install
```

### 1. Prepare databases

Push the database schema to Planetscale:

```sh-session
cd apps/www
pnpm prisma db push
```

create needed tables in clickhouse:

```sh-session
cd apps/api
pnpm setup:clickhouse
```

## Build the packages

```sh-session
pnpm build
```

## Run API

Add a `.env` file in `/apps/api/.env` and populate the values from the services above.

```sh-session
cp apps/api/.env.example apps/api/.env
```

Then run the api:

```sh-session
pnpm turbo run dev --filter=api
```

## Run app

```sh-session
pnpm turbo run dev --filter=web
```