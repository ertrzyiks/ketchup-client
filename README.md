# ketchup-client

## Prerequisite

 - Node 6.x
 - NPM 5.x
 
## Communication with ketchup-server

Configure API and WebSockets endpoints using env variables
```
API_URL='http://localhost:3001'
WS_API_URL='ws://localhost:3001'
```

### Development

Install dependencies

```
npm i
```

and then start the server

```
npm start
```

### Production

```
npm i
npm run build
NODE_ENV=production npm run start:prod
```
