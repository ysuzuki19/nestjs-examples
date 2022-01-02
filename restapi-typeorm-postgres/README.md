# Description

basic REST API example with PostgreSQL

# install packages

```bash
$ npm ci
```

# Run postgres locally (docker)

you can run postgres container with following command for this example.

```bash
$ docker run --name postgresdb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

you can stop with command `$ docker stop postgresdb`.
you can rm container with command `$ docker rm postgresdb`.

# Run development server locally

```bash
$ npm run start:dev
```
