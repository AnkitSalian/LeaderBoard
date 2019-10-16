const pool = require('../databaseConnector/connect');

var playerMiddleWare = {};

playerMiddleWare.checkUserScore = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, score, match} = req;
            (async() => {
                const client = await pool.connect();
                let query = `select score from users where username=${username} and match=${match}`;
                const res = await client.query(query);
                if(res.rowCount > 0){
                    if(res.rows[0].score < score){
                        resolve({updateUser: true});
                    }
                }else{
                    resolve({updateUser: false});
                }
                
            })().catch(error => {
                reject(eror);
            })
        }catch(error){
            reject(eror);
        }
    })
}

playerMiddleWare.storeMatchInfo = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, kills, score, match} = req;
            (async() => {
                const client = await pool.connect();
                const query = {
                    text: 'INSERT INTO users(username, kills, score, match, timestatus) VALUES($1, $2, $3, $4, NOW())',
                    values: [username, kills, score, match],
                  }
                const res = await client.query(query);
                resolve(res.rows[0]);
            })().catch(error => {
                reject(eror);
            })
        }catch(error){
            reject(eror);
        }
    })
}

playerMiddleWare.updateMatchInfo = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, score, match} = req;
            (async() => {
                const client = await pool.connect();
                let query = `update users set score=${score} where username=${username} and match=${match}`;
                const res = await client.query(query);
                resolve({updateStatus: 'SUCCESS'});
            })().catch(error => {
                reject(eror);
            })
        }catch(error){
            reject(eror);
        }
    })
}

module.exports = playerMiddleWare;