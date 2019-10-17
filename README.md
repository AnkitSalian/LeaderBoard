# LeaderBoard
REST API to display leaderboard and player stats
Git Repository Path: https://github.com/AnkitSalian/LeaderBoard.git
Commit Id: 1ef2e6d

#Test Cases

1) Storing the user or update the score:

URL: http://localhost:3001/playersStats/storeMatchInformation
POST call

Request:
  {
    "username":"abc", 
    "kills": 2,
    "score": 300,
    "match":"pubg"
  }

Response:
  i) Stored Success:
          {
                message: 'Score success',
                user: {
                    "username":"abc", 
                    "kills": 2,
                    "score": 300,
                    "match":"pubg"
                  }
            }
   ii) Score Updated:
        {
                message: 'Score updated',
                user: {
                    "username":"abc", 
                    "kills": 2,
                    "score": 300,
                    "match":"pubg"
                  }
            }
            
2) Fetch Top matches for a player
URL: http://localhost:3001/playersStats/:id
GET Request

Response:
 {
    PlayersStats:[
      {
        "match":"pubg",
        "kills": 2,
        "score":300,
        "rank":15
      },
      {
        "match":"call of duty",
        "kills": 8,
        "score":800,
        "rank":9
      }
    ]
 }
 
3) Get match information:
URL: http://localhost:3001/playersStats?match={matchname}&time={time}
GET Request

Request:
time value can be any of 'last 1 hour,last 5 min,weekly,daily'

Response:
{
  PlayersStats:[
      {
        "username":"abc",
        "kills": 2,
        "score":300
      },
      {
        "username":"xyz",
        "kills": 8,
        "score":800
      }
    ]
}

4)Get match information
URL: http://localhost:3001/LeaderBoard?match={matchname}&time={time}
GET Request

Request:
time value can be any of 'last 1 hour,last 5 min,weekly,daily'

Response:
{
  stats:[
      {
        "username":"abc",
        "kills": 2,
        "score":300,
        "rank":15
      },
      {
        "username":"xyz",
        "kills": 8,
        "score":800,
        "rank":9
      }
    ]
}

5)Get top players for matches
URL: http://localhost:3001/LeaderBoard/:id?match={matchname}
GET Request

Response:
{
  stats:[
    {
        "username":"abc",
        "kills": 2,
        "score":300,
        "rank":15
      },
      {
        "username":"xyz",
        "kills": 8,
        "score":800,
        "rank":9
      }
  ]
}