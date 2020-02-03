const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restricted = require('../middleware/restricted-middleware');
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
// const flowsRouter = require('../flows/flows-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter) //TODO: Add restricted middleware!
// server.use('/api/flows', flowsRouter);

module.exports = server;