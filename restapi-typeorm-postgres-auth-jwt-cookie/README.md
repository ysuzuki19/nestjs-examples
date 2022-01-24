# Description

cookie Auth example with PostgreSQL

# install packages

```bash
$ npm ci
```

# Run postgres locally (docker-compose)

you can run postgres container with following command for this example.

```bash
$ docker-compose up
```

# Run development server locally

```bash
$ npm run start:dev
```

# SignUp

POST `localhost:3000/auth/signup` with body `{username: hoge, password: hogehoge, email: test@example.com}`

# SignIn

POST `localhost:3000/auth/signin` with body `{username: hoge, password: hogehoge}`

you can get `access_token` in cookie.

# Check Status

GET `localhost:3000/auth/status` after SignIn
