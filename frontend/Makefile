install-deps:
	npm install

build:install-deps
	npm run build

serve:build
	npm run serve

run:install-deps
	npm start

docker-build:
	docker build --tag onacut-front:latest -f Dockerfile .

docker-run:docker-build
	docker run -p 3000:80 -it onacut-front:latest
