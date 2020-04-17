const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const PORT = 3000;

const letterCombos = []

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(cors())

app.post('/post-crossword', (req, res) => {
  letterCombos.push(req.body)

  if (letterCombos.length === 69) {
    const stringified = JSON.stringify(letterCombos)
      fs.writeFile('letterCombos.js', stringified, function () {
    })
  }
  
  res.send('success')
})

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
