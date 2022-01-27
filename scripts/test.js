
// Requiring the module
const reader = require('xlsx')
  
// Reading our test file
const file = reader.readFile('../database/teams.xlsx')
  
let data = []
  
const sheets = file.SheetNames
 
//makes TEAMS array
for(let i = 0; i < sheets.length; i++)
{
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
   temp.forEach((res) => {
      data.push(res)
   })
}

function getTeamID(teamNickname){
   let teamIDnumber;
   data.map((eachTeam)=>{
      if(eachTeam.NICKNAME == teamNickname){
         teamIDnumber = eachTeam.TEAM_ID;
      }
   })
   return teamIDnumber
}
  
// Printing data
console.log(data)