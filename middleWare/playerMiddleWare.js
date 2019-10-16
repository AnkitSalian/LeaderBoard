const pool = require('../databaseConnector/connect');

var playerMiddleWare = {};

playerMiddleWare.storeMatchInfo = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, kills, score, match} = req;
            (async() => {
                //
            })().catch(error => {
                reject(eror);
            })
        }catch(error){
            reject(eror);
        }
    })
}

module.exports = playerMiddleWare;