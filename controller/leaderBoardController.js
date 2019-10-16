const leaderBoardMiddleWare = require('../middleWare/leaderBoardMiddleWare');

const leaderBoard = {};

leaderBoard.getMatchInfo = async (req, res, next) => {
    try{
        let userList = await leaderBoardMiddleWare.giveUserList(req.query);
        res.status(200).json({
            stats: userList
        })
    }catch(error){
        res.status(500).json({
            msg: error
        })
    }
}

leaderBoard.getTopPlayersofMatches = async (req, res, next) => {
    try{
        let userList = await leaderBoardMiddleWare.getTopUsers(req);
        res.status(200).json({
            stats: userList
        })
    }catch(error){
        res.status(500).json({
            msg: error
        })
    }
}

module.exports = leaderBoard;