# onacut237


## Project setup backend

### REQUIREMENTS

- python (3.x recommended) & pip (>= 22 recommended)
- docker
- make (a command line tool to run Makefile commands)

#### HOW TO SET UP

```
# Put appropriate parameters inside .env.example
make install-deps
```

#### HOW TO LAUNCH

##### DEV

```
make run

# To run tests
make test

# formating
make lint
```

##### PROD

Or Using Docker

```
# This will install and run your project on port 5000
make docker-run
```

### To run the backend, we need `python3` and `pip`

- Install the dependencies
```
pip install -r requirements.txt
```

- Run the backend
```
python3 server.py
```


## Project setup frontend

### REQUIREMENTS

- node & npm
- docker
- make (a command line tool to run Makefile commands)

#### HOW TO SET UP

```
# Put appropriate parameters inside .env.example
make install-deps

# or with npm
npm install
```

#### HOW TO LAUNCH

##### DEV

```
make run

# or with npm
npm start

# To run tests
make test
```

##### PROD

Or Using Docker

```
make serve

# or with npm
npm run serve

# This will install and run your project on port 3000
make docker-run

```
### To launch the frontend, we need `Node` installed and `npm/yarn`

- Install the dependencies
```
npm install or yarn
```

### Compiles and hot-reloads for development
```
npm run start or yarn start
```

### Compiles and minifies for production
```
npm run build or yarn build
```

NB: To launch the `frontend`, you should launch the `backend` first.


### Screenshots

Illustrative video of the project


https://user-images.githubusercontent.com/34966088/184613415-25c245b6-74f5-4197-8b62-f737fa000d86.mp4


