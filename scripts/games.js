
// Requiring the module
const reader = require('xlsx')
  
// Reading our test file
const gamesFile = reader.readFile('../database/games.xlsx')
const teamsFile = reader.readFile('../database/teams.xlsx')
  
let gamesData = [];
let teamsData = [];
  
const gamesSheets = gamesFile.SheetNames;
const teamsSheets = teamsFile.SheetNames;
  
for(let i = 0; i < teamsSheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
      teamsFile.Sheets[teamsFile.SheetNames[i]])
   temp.forEach((res) => {
      teamsData.push(res)
   })
}

for(let i = 0; i < gamesSheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
      gamesFile.Sheets[gamesFile.SheetNames[i]])
   temp.forEach((res) => {
      let homeID = res.HOME_TEAM_ID;
      let awayID = res.VISITOR_TEAM_ID;
      //joins IDS to team nicknames of home and visitor teams
      teamsData.map((eachTeam)=>{
         if(eachTeam.TEAM_ID == homeID){
            res.HOME_TEAM_ID = eachTeam.NICKNAME;
         }
         else if(eachTeam.TEAM_ID == awayID){
            res.VISITOR_TEAM_ID = eachTeam.NICKNAME
         }
      })
      //deletes fields i dont wanna see
      delete res.TEAM_ID_home;
      delete res.TEAM_ID_away;
      
      gamesData.push(res)
   })
}
  
// Printing data
console.log(gamesData);