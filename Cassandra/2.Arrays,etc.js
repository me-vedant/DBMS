//  Update all players total_runs who are batsman to 1000 runs
db.Scores.updateMany({skill:"Batsman"},{$set:{total_runs:1000}})
// Update all players total_wickets who are bowlers to 1000 wickets
db.Scores.updateMany({skill:"Bowler"},{$set:{total_wickets:1000}})
// update all players yoyo test passed status to failed 
db.Players.updateMany({},{$set:{"medical_details.is_passed": "failed"}})
// add a new field named "category" to the Players collection with a default value of Outstanding
db.Players.updateMany({},{$set:{"category": "Outstanding"}})
// add a new field named "homeGround" to the Teams collection with the default value null
db.Teams.updateMany({},{$set:{"home_ground": null }})

// Update HomeGround field of Teams collection
// for Delhi Capitals --> Delhi
// for Mumbai Indians --> Mumbai
// for Rajasthan Royals --> Rajasthan

db.Teams.updateMany({t_name: "Delhi Capitals"},{$set: {home_ground: "Delhi"}})
db.Teams.updateMany({t_name: "Mumbai Indians"},{$set: {home_ground: "Mumbai"}})
db.Teams.updateMany({t_name: "Rajasthan Royals"},{$set: {home_ground: "Rajasthan"}})
// increase all the teams budget by 60
db.Teams.updateMany({},{$mul: {budget :1.6}})

db.students.insertMany( [
   { "_id" : 1, "grades" : [ 85, 85, 80 ] },
   { "_id" : 2, "grades" : [ 88, 90, 92 ] },
   { "_id" : 3, "grades" : [ 85, 100, 90 ] }
] )

db.students.insertMany(
[
    {"_id": 8, 
      "grades":[85,45,99,65],
      "activity_id": [4,5],
      "deans_list":[2022,2021,2020],
      "peans_list": [2022,2020,2019]
    }

]);

db.students.updateOne({"_id":1},{$push:{activity_id :{$each:[1,2,3,4]}}})
/// $all and $elemmatch
db.trial.insertMany(
[
{
   "_id" : "abc",
    "city" : ["Pune","Mumbai","Nagpur"]
},
{
   "_id" : "pqr",
    "city" : ["Mumbai","Pune","Bangalore","Nagpur"]
},
{
   "_id" : "xyz",
    "city" : ["Chennai","Kolkatta","Delhi"]
},
{
   "_id" : "lmn",
    "city" : ["Chennai","Kolkatta","Pune"]
}
]
);
db.trial.find({"city": {$elemMatch:{$eq:"Pune",$eq:"Chennai"}}})

