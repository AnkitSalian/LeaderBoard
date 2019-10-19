const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');

const playerController = require('../controller/playerController');

const playerRouter = express.Router();

playerRouter.use(bodyParser.urlencoded({ extended: false }));
playerRouter.use(bodyParser.json());
playerRouter.use(cors());
playerRouter.use(helmet());
playerRouter.use(hpp());

playerRouter.post('/storeMatchInformation', playerController.storeMatchInformation);
playerRouter.get('/:id', playerController.getTopMatches);
playerRouter.get('/', playerController.getMatchInfo);

module.exports = playerRouter;