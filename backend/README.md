# THIS BACKEND IS DEPRECATED, DON'T USE IT, PLEASE, REFER to ../fastapi  DIRECTORY AS THE NEW BACKEND

## ONACUT-BACKEND


## REQUIREMENTS

- python (3.x recommended) & pip (>= 22 recommended)
- docker
- make (a command line tool to run Makefile commands)

### HOW TO SET UP

```
# Put appropriate parameters inside .env.example
make install-deps
```

### HOW TO LAUNCH

#### DEV

```
make run

# To run tests
make test

# formating
make lint
```

#### PROD

Or Using Docker

```
# This will install and run your project on port 5000
make docker-run
```

