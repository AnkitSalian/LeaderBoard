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

playerMiddleWare.getTopMatches = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const userId = req.params.id;
            
            (async() => {
                const client = await pool.connect();
                let query = `select match, kills, score, rank from users 
                    where userId=${userId}`;
                const res = await client.query(query);
                resolve(res.rows);
                
            })().catch(error => {
                reject(eror);
            })
        }catch(error){
            reject(error);
        }
    })
}

playerMiddleWare.giveUserList = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {match, time} = req;
            let timeValue = '';
            switch(time) {
                case 'last 1 hour':
                    timeValue = "=(NOW() - INTERVAL '12 hours')";
                    break;
                case 'last 5 min':
                    timeValue = "=(NOW() - INTERVAL '5 minutes')";
                    break;
                case 'weekly':
                    timeValue = ` BETWEEN
                    NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7 
                    AND NOW()::DATE-EXTRACT(DOW from NOW())::INTEGER`;
                    break;
                case 'daily':
                    timeValue = '=NOW()';
                    break;
                default:
                    timeValue = '';
            }
            (async() => {
                const client = await pool.connect();
                let query = `select username, kills, score from users 
                    where match=${match} and timestatus ${timeValue} `;
                const res = await client.query(query);
                resolve(res.rows);
                
            })().catch(error => {
                reject(eror);
            })
        }catch(error){
            reject(eror);
        }
    })
}

module.exports = playerMiddleWare;