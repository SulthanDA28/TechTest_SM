# Vehicle Reservation

## Tech Stack

 - Vite + React JS (Frontend) : npm version 10.5.2
 - Docker
 - PHP (Backend)
 - Postgresql (database) : version in docker 16-alpine

## How To Use
 - Clone this repository with command
   ```git clone github.com/SulthanDA28/TechTest_SM```
 - After clone this repository, make sure device have docker. If don't have, install in this [link](https://www.docker.com/products/docker-desktop/)
 - After install docker, you can start to build this application
 - Prepare two terminal, one for frontend and other terminal for backend
   ### Frontend
   - For frontend you can go to folder ```Frontend```
    ```
    cd Frontend
    ```
   - Build the frontend with this command
   ```
   npm install
   npm run dev
   ```
   - Wait until the frontend finish build. If the link ```http://localhost:5173/``` appear, frontend finish build and you can build the backend
   ### Backend
   - For backend you can go to folder ```Backend```
    ```
    cd Backend
    ```
   - Build the frontend with this command
   ```
   docker compose up -d
   ```
   - Wait until the backend finish build. You can test is the backend has to build with this ```http://localhost:8008/index.php/approver```
  - The application ready to use
