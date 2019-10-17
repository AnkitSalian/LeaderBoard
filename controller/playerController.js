const playerMiddleWare = require('../middleWare/playerMiddleWare');

const player = {};

player.storeMatchInformation = async (req, res, next) =>{
    try{
        const updateFlag = await playerMiddleWare.checkUserScore(req.body);
        if(updateFlag){
            const updateStatus = await playerMiddleWare.updateMatchInfo(req.body);
            res.status(200).json({
                message: 'Score updated',
                username: req.body.username
            })
        }else{
            const userInformation = await playerMiddleWare.storeMatchInfo(req.body);
            res.status(200).json({
                message: 'Score success',
                user: req.body
            })
        }
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

player.getTopMatches = (req, res, next) => {
    try{
        let matchList = await playerMiddleWare.getTopMatches(req);
        res.status(200).json({
            PlayersStats: matchList
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

player.getMatchInfo = (req, res, next) => {
    try{
        let usersList = await playerMiddleWare.giveUserList(req.query);
        res.status(200).json({
            PlayersStats: usersList
        })
    }catch(error){
        res.status(500).json({
            message: error
        })
    }
}

module.exports = player;