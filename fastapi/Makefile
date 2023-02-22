.DEFAULT_GOAL=help

CONFIG_FILE=./.env
VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

##venv: setUp the virtualenv (this step is integrated with the instal-xxx target
venv: $(VENVPATH)/bin/activate
$(VENVPATH)/bin/activate: requirements.txt
	test -d $(VENVPATH) || python3 -m venv $(VENVPATH); \
	. $(VENVPATH)/bin/activate; \
	pip install -U pip; \
	pip install -r requirements.txt; \
	touch $(VENVPATH)/bin/activate;

$(CONFIG_FILE):
	echo "> Adding config file..."
	cp .env.example $(CONFIG_FILE)

##install-deps: setup your prod environment
install-deps: venv $(CONFIG_FILE)

##install-dev-deps: setup your dev environment
install-dev-deps: install-deps $(CONFIG_FILE)
	$(PYTHON) -m pip install -r requirements-dev.txt

##run: run the api locally
run: install-deps
	uvicorn onacut.main:app --reload

##docker-build: using docker to build the back image
docker-build:
	docker build --tag onacut_back:latest -f Dockerfile .

##docker-run: using docker to run the back image
docker-run: docker-build
	docker run -ti -p 8002:8000 -v data:/app/data --rm onacut_back:latest

##lint: the source code using black, isort, flake8
lint: install-dev-deps venv
	$(PYTHON) -m black onacut
	$(PYTHON) -m isort onacut
	$(PYTHON) -m flake8 onacut --show-source --statistics --ignore=F821,E402

##test: test your code
test: install-dev-deps lint
	$(PYTHON) -m pytest onacut/tests

##clean: clean the virtualenv
clean:
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-dev-deps install-deps test lint docker-run docker-build run clean
