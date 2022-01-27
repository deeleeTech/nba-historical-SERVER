
// Requiring the module
const reader = require('xlsx')
  
// Reading our test file
const gamesFile = reader.readFile('../database/games.xlsx')
const teamsFile = reader.readFile('../database/teams.xlsx')
  
let gamesData = [];
let teamsData = [];
  
const gamesSheets = gamesFile.SheetNames;
const teamsSheets = teamsFile.SheetNames;

//GET TEAMS ARRAY
for(let i = 0; i < teamsSheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
      teamsFile.Sheets[teamsFile.SheetNames[i]])
   temp.forEach((res) => {
      teamsData.push(res)
   })
}

function getTeamID(teamNickname){
   let teamIDnumber;
   teamsData.map((eachTeam)=>{
      if(eachTeam.NICKNAME == teamNickname){
         teamIDnumber = eachTeam.TEAM_ID;
      }
   })
   return teamIDnumber
}

const soloTeamID = getTeamID('Rockets');
const seasonYear = 2021

//CREATE GAMES ARRAY
for(let i = 0; i < gamesSheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
      gamesFile.Sheets[gamesFile.SheetNames[i]])
   temp.forEach((res) => {
      let homeID = res.HOME_TEAM_ID;
      let awayID = res.VISITOR_TEAM_ID;
      let gameSeason = res.SEASON;
      if((soloTeamID == homeID || soloTeamID == awayID) && gameSeason == seasonYear){ // VALIDATION FILTER
         teamsData.map((eachTeam)=>{
            if(eachTeam.TEAM_ID == homeID){ //REPLEACE ID WITH ACTUAL TEAM NICKNAME
               res.HOME_TEAM_NAME = eachTeam.NICKNAME;
            }
            else if(eachTeam.TEAM_ID == awayID){//REPLEACE ID WITH ACTUAL TEAM NICKNAME
               res.VISITOR_TEAM_NAME = eachTeam.NICKNAME
            }
         })
         //deletes redundant fields
         delete res.TEAM_ID_home;
         delete res.TEAM_ID_away;
         //rewrites WINNER
         res.HOME_TEAM_WINS == 1 ? res.WINNING_TEAM = res.HOME_TEAM_NAME : res.WINNING_TEAM = res.VISITOR_TEAM_NAME;
         delete res.HOME_TEAM_WINS;

         gamesData.push(res)
      }
   })
}
  
// Printing data
console.log(gamesData);