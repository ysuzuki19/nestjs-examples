# Description

basic Auth example with PostgreSQL

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

POST `localhost:3000/auth/signup` with body `{username: hoge, password: hogehoge}`

# SignIn

POST `localhost:3000/auth/signin` with body `{username: hoge, password: hogehoge}`

you can get `access_token` in response-body. Please copy `access_token`.

# Check Status

GET `localhost:3000/auth/status` with Authorization `Bearer <access_token>`.

if you use postman for check result,

1. input `localhost:3000/auth/status`
2. select `Authorization` tab
3. select `Bearer Token` in Type
4. paste `<access_token>` you copied in Token
5. Send!
