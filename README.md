# microservice-image-manipulation
This Micro-service it's a API to manage Upload process, the client App needs to register a new Upload UUID before starting send files to AWS.
- This project contain only the CRUD API part.

## API Documentation
- http://localhost:8000/docs

## Build from source

1. Install dependencies.

   ```sh
   npm install
   ```

2. Build the production server.

   ```sh
   npm build
   ```

3. Run the server.
   ```sh
   npm start
   ```

## Build Docker images

```sh
docker build -t microservice .
```

## Run Locally using Docker composer

```sh
docker-compose up
```

## Run tests

```sh
npm test
```
