
// Requiring the module
const reader = require('xlsx')
  
// Reading our test file
const file = reader.readFile('../database/teams.xlsx')
const sheets = file.SheetNames
 
let allTeams = [];
  sheets.map((eachSheet, index)=>{
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[index]]);
    temp.forEach((res) => {
      allTeams.push(res)
   })
  })
  
// Printing data
console.log(allTeams)