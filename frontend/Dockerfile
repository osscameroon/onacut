FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
ENV HOST 0.0.0.0
EXPOSE 3000
CMD ["yarn", "start"]
