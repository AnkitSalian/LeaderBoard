const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');

const playerRouter = express.Router();

playerRouter.use(bodyParser.urlencoded({ extended: false }));
playerRouter.use(bodyParser.json());
playerRouter.use(cors());
playerRouter.use(helmet());
playerRouter.use(hpp());

module.exports = playerRouter;