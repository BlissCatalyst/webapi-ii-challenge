const express = require('express');

const dbRouter = require('./data/dbRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h1>This is an api from the "webapi-ii-challenge" assignment from earlier this week.</h1>
  `);
});

server.use('/api/posts', dbRouter);

module.exports = server;