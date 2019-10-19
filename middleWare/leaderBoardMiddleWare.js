const fs = require('fs');
var leaderBoardMiddleWare = {};

leaderBoardMiddleWare.giveUserList = (req) => {
    return new Promise((resolve, reject) => {
        try{
            console.log('giveUserList====>');
            
            const {match, time} = req;
            let timeValue = '';
            let currentdate = new Date();
            switch(time) {
                case 'last 1 hour':
                    timeInSec = 60*60*1000;
                    break;
                case 'last 5 min':
                    timeInSec = 5*60*1000;
                    break;
                case 'weekly':
                    timeInSec = 7*24*60*60*1000;
                    break;
                case 'daily':
                    timeInSec = 24*60*60*1000;
                    break;
                default:
                    timeInSec = 0;
            }
            (async() => {
                let rawData =  fs.readFileSync('./data/data.json');
                let userArray = await JSON.parse(rawData);
                let userArrayModified =[];
                userArray.users.map(item=>{
                    if((currentdate - (new Date(item.datetime))< timeInSec)){
                        userArrayModified.push(item);
                    }
                })
                console.log('userArrayModified===>',userArrayModified);

                let matches = {};
                for (let i = 0; i < userArrayModified.length; i++) {
                let match = userArrayModified[i].match;
                
                if (!matches[match]) {
                    matches[match] = [];
                }
                await matches[match].push({username:userArrayModified[i].username,
                                    kills:userArrayModified[i].kills,
                                    score:userArrayModified[i].score});

                await matches[match].sort(function(a, b) {
                    return (a.score) - (b.score);
                });
                await matches[match].map((item, index)=>{
                    item.rank = index+1;
                })
                
                }
                
                let matchArray = [];
                for (var match in matches) {
                    matchArray.push({matchName: match, userList: matches[match]});
                }
                console.log('matchArray===>',matchArray);
                let matchArrayModified = [];
                matchArray.map(item=>{
                    if(item.matchName === match){
                        matchArrayModified.push(item.userList);
                    }
                })
                resolve(matchArrayModified);
            })().catch(error => {
                console.log('error===>',error);
                
                reject(error);
            })
        }catch(error){
            console.log('error===>',error)
            reject(error);
        }
    })
}

leaderBoardMiddleWare.getTopUsers = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const matchId = req.params.id;
            const matchName = req.query.match;
            (async() => {
                let rawData =  fs.readFileSync('./data/data.json');
                let userArray = await JSON.parse(rawData);
                await console.log('userArray===>',userArray.users.length);
                let matchValue ='';
                userArray.users.map(item => {
                    if(item.matchId == matchId){
                        matchValue = item.match;
                    }
                })
                let matches = {};
                for (let i = 0; i < userArray.users.length; i++) {
                let match = userArray.users[i].matchId;
                console.log('======>',match,matches[match]);
                
                if (!matches[match]) {
                    matches[match] = [];
                }
                await matches[match].push({username:userArray.users[i].username,
                                    kills:userArray.users[i].kills,
                                    score:userArray.users[i].score});
                await matches[match].sort(function(a, b) {
                    return (a.score) - (b.score);
                });
                await matches[match].map((item, index)=>{
                    item.rank = index+1;
                })
                }
                
                let matchArray = [];
                for (var match in matches) {
                    matchArray.push({matchName: match, userList: matches[match]});
                }
                console.log('matchArray===>',matchValue);
                let matchArrayModified = [];
                
                matchArray.map(item=>{
                    if(item.matchName === matchId && matchValue === matchName){
                        matchArrayModified.push(item.userList);
                    }
                })
                resolve(matchArrayModified);
                
            })().catch(error => {
                console.log('error===>',error)
                reject(error);
            })
        }catch(error){
            console.log('error===>',error)
            reject(error);
        }
    })
}

module.exports = leaderBoardMiddleWare;