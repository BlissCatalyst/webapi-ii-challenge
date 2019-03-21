const express = require('express');

const dbRouter = require('./data/dbRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda db API</h2>
    <p>Welcome to the Lambda db API</p>
  `);
});

server.use('/api/posts', dbRouter);

module.exports = server;