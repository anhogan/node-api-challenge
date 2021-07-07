const express = require('express');

const projectRoutes = require('./projects/projectRouter');

const actionRoutes = require('./actions/actionRouter');

const server = express();

server.use(express.json());

server.use(logger);

server.use('/api/projects', projectRoutes);

server.use('/api/actions', actionRoutes);

server.get('/', (req, res) => {
  res.send('<h2>Node.js and Express API Sprint Challenge</h2>')
});

function logger(req, res, next) {
  console.log(`${req.method} to ${req.url} at [${new Date().toISOString()}]`);

  next();
}

module.exports = server;