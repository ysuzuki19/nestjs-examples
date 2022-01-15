# Description

basic GraphQL example with PostgreSQL

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

# Query for graphql endpoint with Graphql Playground

please access `http://localhost:3000/graphql` by your browser.

left-side: query
right-side: result

in playground, you can send query by `<Ctrl-Enter>` or `click center button`.

## Create User

```
mutation {
  createUser(createUserInput: {
    name: "ysuzuki19",
    bio: "publish nestjs example"
  }) {
    id
    name
    bio
  }
}
```

## Get User data

```
query {
  user(name: "ysuzuki19") {
    id
    name
    bio
  }
}
```

## Get All Users

```
query {
  users {
    id
    name
    bio
  }
}
```

## Update User

```
mutation {
  updateUser(updateUserInput: {
    name: "ysuzuki19",
    bio: "published nestjs example"
  }) {
    id
    name
    bio
  }
}
```

## Delete User

```
mutation {
  deleteUser(name: "ysuzuki19")
}
```
