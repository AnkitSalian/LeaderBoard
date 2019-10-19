const playerMiddleWare = require('../middleWare/playerMiddleWare');

const player = {};

player.storeMatchInformation = async (req, res, next) =>{
    try{
        console.log('Inside storeMatchInformation====>');
        
        const updateFlag = await playerMiddleWare.checkUserScore(req.body);
        console.log('updateFlag===>',updateFlag);
        
        if(updateFlag === 1){
            const updateStatus = await playerMiddleWare.updateMatchInfo(req.body);
            res.status(200).json({
                message: 'Score updated',
                username: req.body.username
            })
        }else if(updateFlag === 0){
            const userInformation = await playerMiddleWare.storeMatchInfo(req.body);
            res.status(200).json({
                message: 'Score success',
                user: req.body
            })
        }else{
            res.status(200).json({
                message: 'Score is less than your High Score',
                user: req.body
            })
        }
    }catch(error){
        console.log('error===>',error);
        
        res.status(500).json({
            message: error
        })
    }
}

player.getTopMatches = async(req, res, next) => {
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

player.getMatchInfo = async(req, res, next) => {
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