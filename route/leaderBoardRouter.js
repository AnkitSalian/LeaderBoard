const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');

const leaderBoard = require('../controller/leaderBoardController');

const leaderBoardRouter = express.Router();

leaderBoardRouter.use(bodyParser.urlencoded({ extended: false }));
leaderBoardRouter.use(bodyParser.json());
leaderBoardRouter.use(cors());
leaderBoardRouter.use(helmet());
leaderBoardRouter.use(hpp());

leaderBoardRouter.get('/',leaderBoard.getMatchInfo);
leaderBoardRouter.get(':id', leaderBoard.getTopPlayersofMatches)

module.exports = leaderBoardRouter;