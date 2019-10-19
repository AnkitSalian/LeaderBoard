# LeaderBoard
REST API to display leaderboard and player stats
Git Repository Path: https://github.com/AnkitSalian/LeaderBoard.git
Commit Id: 1ef2e6d

#Test Cases

1) Storing the user or update the score:

URL: http://ankitsalian.ap-south-1.elasticbeanstalk.com/playersStats/storeMatchInformation
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
    "message": "Score success",
    "user": {
        "username": "abc",
        "kills": 4,
        "score": 500,
        "match": "pubg"
    }
}
   ii) Score Updated:
        {
    "message": "Score updated",
    "username": "abc"
}
            
2) Fetch Top matches for a player
URL: http://ankitsalian.ap-south-1.elasticbeanstalk.com/playersStats/2
GET Request

Response:
 {
    "PlayersStats": [
        {
            "kills": 4,
            "score": 400,
            "match": "pubg",
            "rank": 2
        },
        {
            "kills": 4,
            "score": 400,
            "match": "minesweeper",
            "rank": 1
        }
    ]
}
 
3) Get match information:
URL: http://ankitsalian.ap-south-1.elasticbeanstalk.com/playersStats?match=pubg&time=weekly
GET Request

Request:
time value can be any of 'last 1 hour,last 5 min,weekly,daily'

Response:
{
    "PlayersStats": [
        [
            {
                "username": "abc",
                "kills": 2,
                "score": 300
            },
            {
                "username": "xyz",
                "kills": 4,
                "score": 300
            }
        ]
    ]
}

4)Get match information
URL: http://ankitsalian.ap-south-1.elasticbeanstalk.com/LeaderBoard?match=pubg&time=weekly
GET Request

Request:
time value can be any of 'last 1 hour,last 5 min,weekly,daily'

Response:
{
    "stats": [
        [
            {
                "username": "abc",
                "kills": 2,
                "score": 300,
                "rank": 1
            },
            {
                "username": "xyz",
                "kills": 4,
                "score": 300,
                "rank": 2
            }
        ]
    ]
}

5)Get top players for matches
URL: http://ankitsalian.ap-south-1.elasticbeanstalk.com/LeaderBoard/2?match=minesweeper
GET Request

Response:
{
    "stats": [
        [
            {
                "username": "abc",
                "kills": 4,
                "score": 400,
                "rank": 1
            },
            {
                "username": "xyz",
                "kills": 4,
                "score": 400,
                "rank": 2
            }
        ]
    ]
}