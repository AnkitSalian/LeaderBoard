const pool = require('../databaseConnector/connect');
const fs = require('fs');

var playerMiddleWare = {};

playerMiddleWare.checkUserScore = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, score, match} = req;
            (async()=>{
                let rawData =  fs.readFileSync('./data/data.json');
                let userArray = await JSON.parse(rawData);
                await console.log('userArray===>',userArray.users.length);
                let flag = 0;
                for(let i = 0; i < userArray.users.length; i++){
                    if(userArray.users[i].username === username && userArray.users[i].match === match){
                        if(userArray.users[i].score < score){
                            flag=1;
                        }else{
                            flag=2;
                        }
                    }
                }
                resolve(flag);

            })().catch(error=>{
                console.log('error===>',error);
                
                reject(error);
            })
            
        }catch(error){
            reject(error);
        }
    })
}

playerMiddleWare.getUserIdAndMatchId = (username, matchName, userJson) => {
    return new Promise((resolve, reject)=>{
        try{
            let userFlag = false, matchFlag = false, userId, matchId, maxUserId=0, maxMatchId=0;
            userJson.users.map(item=>{
                if(item.username === username){
                    userFlag = true;
                    userId = item.userId;
                }
                if(item.match === matchName){
                    matchFlag = true;
                    matchId = item.matchId;
                }
                if(maxUserId < item.userId){
                    maxUserId = item.userId;
                }
                if(maxMatchId < item.matchId){
                    maxMatchId = item.matchId;
                }
            })
            if(!userFlag){
                userId = maxUserId + 1;
            }
            if(!matchFlag){
                matchId = maxMatchId + 1;
            }
            resolve({userId, matchId});
        }catch(error){
            console.log('error===>', error);
            reject(error);
        }
    })
}

playerMiddleWare.storeMatchInfo = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, kills, score, match} = req;
            (async() => {
                let rawData =  fs.readFileSync('./data/data.json');
                let userArray = await JSON.parse(rawData);
                const {userId, matchId} = await playerMiddleWare.getUserIdAndMatchId(username, match, userArray);
                console.log('userId, matchId=====>',userId, matchId);
                
                var currentdate = new Date();
                let user = {
                    username, kills, score, match, datetime: currentdate, userId, matchId
                }
                userArray.users.push(user);
                let data = JSON.stringify(userArray);
                fs.writeFileSync('./data/data.json', data);
                resolve("Record Stored");
            })().catch(error => {
                reject(error);
            })
        }catch(error){
            reject(error);
        }
    })
}

playerMiddleWare.updateMatchInfo = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {username, score, match} = req;
            (async() => {
                let rawData =  fs.readFileSync('./data/data.json');
                let userArray = await JSON.parse(rawData);
                for(let i = 0; i < userArray.users.length; i++){
                    if(userArray.users[i].username === username && userArray.users[i].match === match){
                        userArray.users[i].score = score
                    }
                }
                let data = JSON.stringify(userArray);
                fs.writeFileSync('./data/data.json', data);
                resolve(userArray);
            })().catch(error => {
                reject(error);
            })
        }catch(error){
            reject(error);
        }
    })
}

playerMiddleWare.getTopMatches = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const userId = req.params.id;
            
            (async() => {
                let rawData =  fs.readFileSync('./data/data.json');
                let userArray = await JSON.parse(rawData);
                await console.log('userArray===>',userArray.users.length);

                let matches = {};
                for (let i = 0; i < userArray.users.length; i++) {
                let match = userArray.users[i].match;
                console.log('======>',match,matches[match]);
                
                if (!matches[match]) {
                    matches[match] = [];
                }
                await matches[match].push({username:userArray.users[i].username,
                                    kills:userArray.users[i].kills,
                                    score:userArray.users[i].score,
                                    match:userArray.users[i].match,
                                    userId:userArray.users[i].userId});
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
                let userArrayModified = [];
                await matchArray.map((item, index)=>{
                    item.userList.map(user=>{
                        userArrayModified.push(user);
                    })
                })
                await console.log('userArrayModified===>',userArrayModified);
                let userMatches ={};
                for (let i = 0; i < userArrayModified.length; i++) {
                    let userId = userArrayModified[i].userId;
                    
                    if (!userMatches[userId]) {
                        userMatches[userId] = [];
                    }
                    await userMatches[userId].push({ kills:userArrayModified[i].kills,
                                        score:userArrayModified[i].score,
                                        match:userArrayModified[i].match,
                                        rank:userArrayModified[i].rank});
                    
                }
                let userMatchArray = [];
                for (var userId in userMatches) {
                   await userMatchArray.push({userId, userData: userMatches[userId]});
                }
                console.log('userMatchArray===>',userMatchArray);
                let data = JSON.stringify(userMatchArray);
                fs.writeFileSync('./data/matchRanks.json', data);
                let output = [];//userId
                userMatchArray.map(item=>{
                    if(item.userId === userId){
                        output = item.userData;
                    }
                })
                resolve(output);
                
            })().catch(error => {
                console.log('error===>',error);
                
                reject(error);
            })
        }catch(error){
            console.log('error===>',error);
            reject(error);
        }
    })
}

playerMiddleWare.giveUserList = (req) => {
    return new Promise((resolve, reject) => {
        try{
            const {match, time} = req;
            let timeInSec = 0;
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
                reject(error);
            })
        }catch(error){
            reject(error);
        }
    })
}

module.exports = playerMiddleWare;