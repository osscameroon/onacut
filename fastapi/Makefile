.DEFAULT_GOAL=help

CONFIG_FILE=./.env
VENVPATH=venv
PYTHON=$(VENVPATH)/bin/python3

venv: $(VENVPATH)/bin/activate
$(VENVPATH)/bin/activate: requirements.txt
	test -d $(VENVPATH) || virtualenv -p python3 $(VENVPATH); \
	. $(VENVPATH)/bin/activate; \
	pip install -U pip; \
	pip install -r requirements.txt; \
	touch $(VENVPATH)/bin/activate;

$(CONFIG_FILE):
	echo "> Adding config file..."
	cp .env.example $(CONFIG_FILE)

##install-deps: setup your dev environment
install-deps: venv $(CONFIG_FILE)

install-dev-deps: install-deps $(CONFIG_FILE)
	$(PYTHON) -m pip install -r requirements-dev.txt

##run: run the api locally
run: install-deps
	uvicorn onacut.main:app --reload

docker-build:
	docker build --tag onacut_back:latest -f Dockerfile .

docker-run: docker-build
	docker run -p 8000:8000 -it onacut_back:latest

lint: install-dev-deps venv
	$(PYTHON) -m black onacut
	$(PYTHON) -m isort onacut
	$(PYTHON) -m flake8 onacut --show-source --statistics --ignore=F821,E402

##test: test your code
test: install-dev-deps lint
	$(PYTHON) -m pytest onacut/tests

clean:
	rm -rf $(VENVPATH)

##help: show help
help : Makefile
	@sed -n 's/^##//p' $<

.PHONY : help venv install-deps test lint
