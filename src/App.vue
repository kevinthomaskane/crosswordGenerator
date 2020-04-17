<template>
  <div id="app">
    <div class="crossword-wrapper" v-for="(letterCombo, i) of current" :key="i">
      <crossword
        :letterCombo="letterCombo"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { letterCombos as LETTERCOMBOS } from './assets/letterCombos'
import Crossword from './components/Crossword'

export default {
  name: 'App',
  components: {
    'crossword': Crossword
  },
  data () {
    return {
      LETTERCOMBOS,
      grid: [],
      current: [
        {
          letters: 'eospdn',
          words: [
            'spend',
            'nodes',
            'ponds',
            'posed',
            'opens',
            'does',
            'open',
            'done',
            'send',
            'nose',
            'dose',
            'pose',
            'pond',
            'node',
            'sped',
            'dope',
            'pens',
            'nods',
            'pods',
            'ends',
            'ones',
            'one',
            'end',
            'son',
            'pen',
            'nod',
            'den',
            'pod',
            'ode'
          ]
        },
      ]
    }
  },
  mounted () {
    // fill the grid with 20 arrays (rows) each with 20 indexes (columns)
    this.grid = new Array(20).fill(new Array(20).fill(0))
  },
  methods: {
    fillGrid () {
      allLetterCombos:
      for (let i = 0; i < this.LETTERCOMBOS.length; i++) {

        const grid = []
        const x = new Array(20).fill(0)
        while (grid.length < 20) {
          grid.push([...x])
        }

        let placedWords = []
        letterComboWords: 
        for (let j = 0; j < this.LETTERCOMBOS[i].words.length; j++) {
          const word = this.LETTERCOMBOS[i].words[j]
          const letters = word.split('')
          const coordinates = []

          // for first word, place it horizontally in center of grid
          if (j === 0) {
            grid[9] = grid[9].map((space, i) => {
              if (letters[i]) {
                coordinates.push([9, i])
              }
              return letters[i] ? letters[i] : 0
            })

            placedWords.push({
              letters,
              word,
              coordinates,
              layout: 'horizontal'
            })
            continue
          }

          // now that placedWords is populated, we need to loop through it looking for potential fits
          placedWords:
          for (let k = 0; k < placedWords.length; k++) {

            // for all other words, cross check for similar letters against the word that was just placed
            for (let l = 0; l < placedWords[k].letters.length; l++) {

              // indicates a potential fit
              if (letters.indexOf(placedWords[k].letters[l]) > -1) {
                const matchedLetterIndex = letters.indexOf(placedWords[k].letters[l])
                if (placedWords[k].layout === 'horizontal') {

                  // check if new word will fit within contraints of grid
                  const coordinatesOfPlacedLetter = placedWords[k].coordinates[l]
                  const rowCoord = coordinatesOfPlacedLetter[0]
                  const colCoord = coordinatesOfPlacedLetter[1]

                  // if this returns true, we know that the word will fit vertically
                  if (rowCoord - matchedLetterIndex >= 0 && rowCoord + (letters.length - matchedLetterIndex) <= 20) {
                    const newLetterCoordinates = []
                    // create coordinates of new letters
                    for (let i = 0; i < letters.length; i++) {
                      // rowCoord will be the row index of the placed word.  We need to loop through each letter of the new word at get its potential coordinates
                      const newRowCoord = rowCoord - (matchedLetterIndex - i)
                      const newColCoord = colCoord
                      const coordinates = [newRowCoord, newColCoord]

                      newLetterCoordinates.push(coordinates)
                    }

                    // check to see if new letter coordinates are surrounded by 0's on left and right
                    for (let i = 0; i < newLetterCoordinates.length; i++) {
                      const row = newLetterCoordinates[i][0]
                      const col = newLetterCoordinates[i][1]

                      // check if we are at the matching letter
                      if (JSON.stringify(coordinatesOfPlacedLetter) === JSON.stringify(newLetterCoordinates[i])) {
                        coordinates.push(newLetterCoordinates[i])
                        continue
                      }

                      if (grid[row][col] === 0 /* is the spot currently not occupied */ &&
                         (grid[row][col + 1] === 0 || grid[row][col + 1] === undefined) /* is the spot to right not occupied or the last column */ &&
                         (grid[row][col - 1] === 0 || grid[row][col - 1] === undefined)) {

                        coordinates.push(newLetterCoordinates[i])
                      }
                    }

                    // if the checks passed, these arrays should be of equal length
                    if (coordinates.length === newLetterCoordinates.length) {
                      for (let i = 0; i < coordinates.length; i++) {
                        const letter = letters[i]
                        const row = coordinates[i][0]
                        const col = coordinates[i][1]
                        grid[row][col] = letter
                      }

                      /* placedWords.push({
                       *   letters,
                       *   word,
                       *   coordinates,
                       *   layout: 'vertical'
                       * })
                       */
                      break letterComboWords
                    }
                  }
                }
              }
            }
          }


        }
        /* console.log(grid) */
        return
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
