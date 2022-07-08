FROM node:14-alpine AS builder

# set working directory
WORKDIR /app

# Install app dependencies
#copies package.json and package-lock.json to Docker environment
COPY package.json package-lock.json ./

# Install all node packages
RUN npm install

# Copies everything over to Docker environment
COPY . ./
RUN npm run build

#Stage 2
#######################################
#pull the official nginx:1.23.0 base image
FROM nginx:1.23.0
#copies React to the container directory
# Set working directory to nginx resources directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static resources
RUN rm -rf ./*
# Copies static resources from builder stage
COPY --from=builder /app/build .
EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
