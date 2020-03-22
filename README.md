# Pro Polls
Straw poll app made with node.js, express.js, mongodb, mongoose, socket.io, and chart.js.

Steps to run:
1. Clone or download this repository
2. npm install
3. Create a config folder with the file dev.env
4. Include these lines
```
PORT=3000
MONGODB_URL=mongodb://127.0.0.1:27017/pro-polls-api
NODE_ENV=development
SESSION=keyboard cat
```
5. Make sure mongod is running
6. npm run dev