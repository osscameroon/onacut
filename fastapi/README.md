## ONACUT-FASTAPI-BACKEND

## REQUIREMENTS

- python (3.x recommended) & pip (>= 22 recommended)
- docker
- make (a command line tool to run Makefile commands)

### HOW TO SET UP

```
# Put appropriate parameters inside .env after this copy
cp .env.example .env

# Install dependencies
make install-deps

# For dev dependencies :
make install-dev-deps
```

### HOW TO LAUNCH

#### DEV

```
# This will install all requirements and start locally the backend
make run

# To run tests
make test

# formating and lint the code 
make lint
```

#### PROD

Or Using Docker

```
# This will install and run your project on port 5000
make docker-run
# should start building first the service
```

