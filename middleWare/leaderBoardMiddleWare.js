const pool = require('../databaseConnector/connect');

var leaderBoardMiddleWare = {};

leaderBoardMiddleWare.giveUserList = (req) => {
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
                let query = `select username, kills, score, match from users 
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

leaderBoardMiddleWare.getTopUsers = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const matchId = req.params.matchId;
            const match = req.query.match;
            (async() => {
                const client = await pool.connect();
                let query = `select username, kills, score, rank from users 
                    where match=${match} and matchId ${matchId} `;
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

module.exports = leaderBoardMiddleWare;