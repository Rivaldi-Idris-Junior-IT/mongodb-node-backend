const http = require('http');

const app = require('./src/app')

const port = process.env.PORT || 4100

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Service Running on Port ${port}`)
})