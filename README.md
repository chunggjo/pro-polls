# Pro Polls

Real-time voting app made with node.js, express.js, mongodb, mongoose, socket.io, and chart.js.

## Steps to run:

1. Clone or download this repository.
2. cd pro-polls
3. npm install
4. mkdir config && cd config && touch dev.env
5. Open dev.env in a text editor and paste these lines:

```
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/pro-polls-api
NODE_ENV=development
SESSION=keyboard cat
```

6. Make sure mongod is running.
7. npm run dev

## Running tests:

1. cd config && touch test.env
2. Open test.env in a text editor and paste these lines:

```
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/pro-polls-api-test
NODE_ENV=development
SESSION=keyboard cat
```

3. npm run test
