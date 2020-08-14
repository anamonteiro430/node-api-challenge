//imports
const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter');
const cors = require('cors');

//server
const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
server.get('/', (req, res) => {
	res.send(`<h1>First Sprint!</h1>`);
});

//middleware

//exports
module.exports = server;
