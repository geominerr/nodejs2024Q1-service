# Home Library Service

# [ Part 1 ] REST API

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
HTTPS
git clone https://github.com/geominerr/nodejs2024Q1-service.git
```

or

```
SSH
git clone git@github.com:geominerr/nodejs2024Q1-service.git
```

## Change directory

```
cd nodejs2024q1-service
```

## Change branch

```
git checkout dev
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

---

# [ Part 2] Containerization, Docker and Database & ORM

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

**HTTPS**

```bash
git clone https://github.com/geominerr/nodejs2024Q1-service.git
```

**SSH**

```bash
git clone git@github.com:geominerr/nodejs2024Q1-service.git
```

## Change directory

```bash
cd nodejs2024q1-service
```

## Change branch

```bash
git checkout feat/docker_db
```

## Installing NPM modules

```bash
npm install
```

## Environment

Create .env and copy data from .env.example

```bash
cp .env.example .env
```

## Run docker compose

You must have Docker Desktop installed and running before running this command

[Get Docker](https://docs.docker.com/get-docker/)

```bash
docker-compose up
```

After starting the app on port (4000 as default) you can open in your browser OpenAPI documentation by typing [Open doc](http://localhost:4000/doc/).
For more information about OpenAPI/Swagger please visit [Swagger](https://swagger.io/).

## Postgres database

When first launched, the **pg_data** and **pg_logs** directories are created in the root

After starting the db on port (5432 as default) you can connect to the database using the credentials specified in the .env

> ❗ This is not necessary to develop or pass tests.
> Just to visualize data

## Prisma ORM

When the database is ready to connect, the application container will perform prisma migrations
automatically.

> ❗❗❗ No need to manually perform migrations

> ❗ If for some reason you need to perform migrations
> run the following command:

```bash
npx prisma migrate deploy
```

or

```bash
docker ps
```

Copy the container id where nest-app is running

```bash
| CONTAINER ID   | IMAGE                              | Others |
|----------------|------------------------------------|--------|
| 8e02bf3305ad   | home-library-service-nest_app      | ...    |
| d7b5d4177ff1   | home-library-service-postgres_db   | ...    |
```

Run the following command

```bash
docker exec -it <container_id> npx prisma migrate deploy
```

## Use Docker Hub

- **For nest-app image**

  ```bash
  docker pull fenixfunk/nest-app:latest
  ```

  Change docker-compose.yaml in the root

  ```yaml
  # you should delete this or comment it out
  build:
    context: .
    dockerfile: ./docker/nest.dockerfile

  # add the following
  image: fenixfunk/nest-app
  ```

- **For postrges-db image**

  ```bash
  docker pull fenixfunk/postgres-db:latest
  ```

  Change docker-compose.yaml in the root

  ```yaml
  # you should delete this or comment it out
  build:
    context: .
    dockerfile: ./docker/postgres.dockerfile

  # add the following
  image: fenixfunk/postgres-db
  ```

## Docker audit

To see available images

```bash
docker images
```

**Example:**

```bash
| REPOSITORY <image_name>          |  TAG   | IMAGE ID <image_id> | Others |
| -------------------------------- | :----: | :-----------------: | ------ |
| nodejs2024q1-service-nest_app    | latest |    bdcb5e10886d     | ...    |
| nodejs2024q1-service-postgres_db | latest |    0791cf0462c5     | ...    |
```

**Сopy the image name or id**

```bash
npm run docker:audit <image_name or image_id>
```

or

```bash
npm run docker:audit -- <image_name or image_id>
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```
