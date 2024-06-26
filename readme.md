# FYP 2022 - LifeOrganiser

LifeOrganiser is an application built on React Native for organising various tasks, habits and todo items.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies before attempting to run. To install all dependencies, use this command:

- `npm run install:all`

To run, use one of the following commands (second command will start server in development mode for hot reloading)
- `npm start`
- `npm run start:dev`

If you wish to open client/server in two seperate windows, you may use the following commands to do so, using the dev version where necessary
- `npm run start:client`
- `npm run start:client:dev`
- `npm run start:server`
- `npm run start:server:dev`

## Environment variables
Environment variables need to be provided to both the frontend and the backend seperately. These can be passed in as usual or a `.env` file can be placed in the root directory of the "server" and "client" sections. Provided below are sample `.env` files

### client/.env
API_BASEPATH=https://backend-server.com
APPNAME=MyAppName

### server/.env
```
MONGO_URI=mongodb+srv://username:passowrd@mongouri.com/dbname?retryWrites=true&w=majority
SESSION_SECRET=RandomLongString
```