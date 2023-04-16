### API

Setup an environment with the file `app.env` containing following the same structure of app.env.example

#### Local Postgres

Login to database with user `postgres`

```bash
psql -U postgres
```

Create a database called `go_api_db`

```bash
CREATE DATABASE go_api_db;
```

Select the database you just created

```bash
\c go_api_db;
```

Add the UUID extension

```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Exit psql

```bash
\q
```

Should be good enough to set it up properly

### Starting application

With make installed in your machine, run `make dev` or run `go run main.go` if you don't have it installed

### Building application

With make installed, run `make build` or run `go build main.go`