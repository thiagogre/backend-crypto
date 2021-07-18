### 🧭 Running the application

```bash

# Create a folder and access it
$ mkdir crypto-dashboard && cd crypto-dashboard

# Clone these repositories
$ git clone https://github.com/thiagogre/backend-crypto.git
$ git clone https://github.com/thiagogre/frontend-crypto.git

# Added permissions for docker entrypoints
$ chmod +x frontend-crypto/.docker/entrypoint.sh
$ chmod +x backend-crypto/.docker/entrypoint.sh

# Add a docker-compose.yaml config file, example is below

# Don't forget to add your binance keys to the backend-crypto/.env

# Now, up containers
$ docker-compose up

# Frotend application is listen at localhost:4000
# Backend is listen at localhost:3000
# API docs => localhost:3000/docs

```

```bash
#docker-compose.yaml

version: "3"

services:
    backend:
        build:
            context: ./backend-crypto
            dockerfile: Dockerfile
        entrypoint: .docker/entrypoint.sh
        ports:
            - 3000:3000
        volumes:
            - ./backend-crypto/:/home/node/backend
    frontend:
        build:
            context: ./frontend-crypto
            dockerfile: Dockerfile
        entrypoint: .docker/entrypoint.sh
        ports:
            - 4000:4000
        volumes:
            - ./frontend-crypto/:/home/node/frontend
```
