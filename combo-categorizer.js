const { letterCombos } = require('./letterCombos');
const fs = require('fs');

const categories = {
  easy: [],
  medium: [],
  hard: [],
  all: letterCombos
}

for (let i = 0; i < letterCombos.length; i++) {
  if (letterCombos[i].placedWords <= 6) {
    categories.easy.push(letterCombos[i])
    continue
  }

  if (letterCombos[i].placedWords <= 12) {
    categories.medium.push(letterCombos[i])
    continue
  }

  categories.hard.push(letterCombos[i])
}

async function writeCategoryFiles () {
  
  for (const category in categories) {
    const stringified = JSON.stringify(categories[category]);

    await fs.writeFile(`./client/src/letter-combos/combos-${category}.js`, stringified, function () {})
  }
}

writeCategoryFiles();
