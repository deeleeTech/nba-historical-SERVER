var express = require('express');
var router = express.Router();
// Requiring the module
const reader = require('xlsx')

/* GET ALL TEAMS  */
router.get('/getAll', function(req, res, next) {
  // Reading our test file
const file = reader.readFile(`${__dirname}/teams.xlsx`)
const sheets = file.SheetNames;
 
let allTeams = [];
sheets.map((eachSheet, index)=>{
    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[index]]);
    temp.forEach((res) => {
      allTeams.push(res)
   })
})
  res.send(allTeams); // CLIENT SENDOFF ---->
});

module.exports = router;
