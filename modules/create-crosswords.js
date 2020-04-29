const fs = require('fs');
const Crossword = require('./Crossword');
const letterCombos = require('./letter-combos/letter-combos-no-grid');

const combos = []

for (let i = 0; i < letterCombos.length; i++) {
  const crossword = new Crossword(letterCombos[i])
  crossword.init()

  const { grid } = crossword
  const { letters } = crossword.letterCombo

  const placedWords = crossword.placedWords.map(obj => obj.word)

  combos.push({
    letters,
    grid,
    placedWords
  })
}

const stringified = JSON.stringify(combos)
fs.writeFile(`./letter-combos/letter-combos-with-grid.js`, stringified, function () {})
