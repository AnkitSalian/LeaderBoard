const express = require('express');
const app = express();

const leaderBoardRouter = require('../route/leaderBoardRouter');
const playerRouter = require('../route/playerRouter');

app.use('/LeaderBoard', leaderBoardRouter);
app.use('/playersStats', playerRouter);

module.exports = app;