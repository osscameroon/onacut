## ONACUT-FRONTEND


## REQUIREMENTS

- node & npm
- docker
- make (a command line tool to run Makefile commands)

### HOW TO SET UP

```
# Put appropriate parameters inside .env.example
make install-deps

# or with npm
npm install
```

### HOW TO LAUNCH

#### DEV

```
make run

# or with npm
npm start

# To run tests
make test
```

#### PROD

Or Using Docker

```
make serve

# or with npm
npm run serve


# This will install and run your project on port 3000
make docker-run
```
