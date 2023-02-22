### ONACUT BACKEND

#### REQUIREMENTS

- python (3.x recommended) & pip (>= 22 recommended)
- docker
- make (a command line tool to run Makefile commands)

#### How to run ?

```console
$ make run
```

With a Dockerfile:

```console
$ make docker-build && make docker-run
```

Manually:


#### Manual setup

Put the appropriate parameters inside .env after this copy
```console
$ cp .env.example .env
```

Create a venv folder:
```console
$ python3 -m venv venv
```

Activate the venv:
```console
$ source venv/bin/activate
```

Install requirements:
```console
$ pip install -r requirements.txt
```

Run the server:
```console
$ uvicorn onacut.main:app --reload --host 0.0.0.0 --port 8002
```

Don't forget to deactivate the venv when you're done:
```console
$ deactivate
```

#### More make file commands

You can run `make` to see all available commands.
```console
$ make
venv: setUp the virtualenv (this step is integrated with the instal-xxx target
install-deps: setup your prod environment
install-dev-deps: setup your dev environment
run: run the api locally
docker-build: using docker to build the back image
docker-run: using docker to run the back image
lint: the source code using black, isort, flake8
test: test your code
clean: clean the virtualenv
help: show help
```
