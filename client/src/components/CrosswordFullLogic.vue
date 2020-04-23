<template>
  <div class="crossword-container">
    <h1>{{ letterCombo.letters }}</h1>
    <div class="row" v-for="(row, i) of grid" :key="i">
      <div class="space" v-for="(col, j) of row" :key="j">{{ col ? col.letter : '' }}</div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.crossDomain = true;

export default {
  name: 'Crossword',
  props: {
    letterCombo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      grid: [],
      placedWords: [],
      furthestColumn: -1
    }
  },
  mounted () {
    this.setStartingGrid()
    this.placeFirstWord()
    this.fillGrid()
    this.removeUnusedSpaces()
    /* this.postToBackEnd() */
  },
  methods: {
    /**
     * @desc creates an array filled with 20 arrays each 20 indices long, or a 20x20 grid. Each sub-index represents a space on the crossword puzzle. A 0 indicates that the space is empty, while an object with the following structure represents a filled space: {letter: 'a', partOfWord: 'apple'}
     */
    setStartingGrid () {
      const grid = []
      while (grid.length < 20) {
        const row = new Array(20).fill(null)
        grid.push(row)
      }
      this.grid = grid
    },

    /**
     * @desc place the first word from the words array into the grid.  Give it the option to be laid out horizontally or vertically
     */
    placeFirstWord () {
      // start with the first word in the words array for the letter combo
      const word = this.letterCombo.words[0]
      const letters = word.split('')

      // keep track of coordinates for each letter as they are placed in the grid
      const coordinates = []
      // we'll start at row 9, column 0 which will correspond with i
      for (let i = 0; i < letters.length; i++) {
        this.grid[9][i] = {
          letter: letters[i],
          partOfWord: word
        }
        coordinates.push([9, i])
      }

      // push this to array of placed words and keep track of relevant info
      this.placedWords.push({
        letters,
        word,
        coordinates,
        layout: 'horizontal'
      })
    },

    /**
     * @desc loops through rest of letterCombo.words array and searches for matching letters within the placedWords array
     */
    fillGrid () {
      // loop through the rest of the letterCombo words and check for matches with placedWords
      outer:
      for (let i = 1 /* first word already placed */; i < this.letterCombo.words.length; i++) {
        const WORD = this.letterCombo.words[i]
        const LETTERS = WORD.split('')

        // start looping through placed words to find a letter match
        for (let j = 0; j < this.placedWords.length; j++) {
          const placedWord = this.placedWords[j]

          // loop through placedWord letters to see if there are any letter matches with current word
          nextPlacedLetter:
          for (let k = 0; k < placedWord.letters.length; k++) {
            
            // if true, indicates that the placedWord and WORD share a common letter
            if (LETTERS.indexOf(placedWord.letters[k]) > - 1) {
              const MATCHED_LETTER_INDEX = LETTERS.indexOf(placedWord.letters[k])
              const placedLetterCoordinates = placedWord.coordinates[k]

              // check to see if the word will fit in the grid
              const fitsGrid = this.fitsGrid(placedWord, placedLetterCoordinates, MATCHED_LETTER_INDEX, LETTERS.length)

              if (fitsGrid) {
                // keep track of where the new letters should be placed in the grid
                const LETTER_COORDINATES = []

                // indicates that we will be placing WORD vertically
                if (placedWord.layout === 'horizontal') {
                  // loop through letters and give them a coordinate based on where the match exists
                  for (let i = 0; i < LETTERS.length; i++) {
                    const ROW = placedLetterCoordinates[0] - (MATCHED_LETTER_INDEX - i)
                    const COL = placedLetterCoordinates[1]
                    LETTER_COORDINATES.push([ROW, COL])
                  }

                  // check to see whether the unplaced letter coordinates are surrounded by 0's 
                  for (let i = 0; i < LETTER_COORDINATES.length; i++) {
                    const ROW = LETTER_COORDINATES[i][0]
                    const COL = LETTER_COORDINATES[i][1]

                    // check if we are at the matching letter and make sure we aren't overwriting a currently placed word
                    if (JSON.stringify(placedLetterCoordinates) === JSON.stringify(LETTER_COORDINATES[i]) &&
                        this.isTopSpotClear(ROW, COL) &&
                        this.isBottomSpotClear(ROW, COL)) {
                      continue
                    }

                    const nextSpot = this.grid[ROW + 1] ? [ROW + 1, COL] : undefined
                    const prevSpot = this.grid[ROW - 1] ? [ROW - 1, COL] : undefined

                    // if we are at the spot right above the matching letter
                    if (JSON.stringify(nextSpot) === JSON.stringify(placedLetterCoordinates)) {
                      if (this.isRightSpotClear(ROW, COL) &&
                          this.isLeftSpotClear(ROW, COL) &&
                          this.isCurrentSpotClear(ROW, COL) &&
                          this.isTopSpotClear(ROW, COL)) {
                        continue
                      } 
                      continue nextPlacedLetter
                    }

                    // if we are at the spot right below the matching letter
                    if (JSON.stringify(prevSpot) === JSON.stringify(placedLetterCoordinates)) {
                      if (this.isRightSpotClear(ROW, COL) &&
                          this.isLeftSpotClear(ROW, COL) &&
                          this.isCurrentSpotClear(ROW, COL) &&
                          this.isBottomSpotClear(ROW, COL)) {
                        continue
                      } 
                      continue nextPlacedLetter
                    }

                    // if letter is surrounded by anything, it must pass all checks
                    if (this.isRightSpotClear(ROW, COL) &&
                        this.isLeftSpotClear(ROW, COL) &&
                        this.isTopSpotClear(ROW, COL) &&
                        this.isCurrentSpotClear(ROW, COL) &&
                        this.isBottomSpotClear(ROW, COL)) {
                      continue
                    } 

                    continue nextPlacedLetter
                  }

                  // if we make it this far, then we know that the LETTERS have valid coordinates and are ready to be placed on grid
                  this.addToGridAndPlacedWords(LETTER_COORDINATES, LETTERS, WORD, placedWord)

                  // WORD has been placed, move on to the next word
                  continue outer

                  // handle words that need to be placed horizontally
                } else {

                  // loop through letters and give them a coordinate based on where the match exists
                  for (let i = 0; i < LETTERS.length; i++) {
                    const ROW = placedLetterCoordinates[0]
                    const COL = placedLetterCoordinates[1] - (MATCHED_LETTER_INDEX - i)
                    LETTER_COORDINATES.push([ROW, COL])
                  }

                  // check to see whether the unplaced letter coordinates are surrounded by 0's
                  for (let i = 0; i < LETTER_COORDINATES.length; i++) {
                    const ROW = LETTER_COORDINATES[i][0]
                    const COL = LETTER_COORDINATES[i][1]

                    // check if we are at the matching letter and make sure we aren't overwriting a currently placed word
                    if (JSON.stringify(placedLetterCoordinates) === JSON.stringify(LETTER_COORDINATES[i]) &&
                        this.isLeftSpotClear(ROW, COL) &&
                        this.isRightSpotClear(ROW, COL)) {
                      continue
                    }

                    const nextSpot = this.grid[ROW][COL + 1] ? [ROW, COL + 1] : undefined
                    const prevSpot = this.grid[ROW][COL - 1] ? [ROW, COL - 1] : undefined

                    // if we are at the spot to the left of the matching letter
                    if (JSON.stringify(nextSpot) === JSON.stringify(placedLetterCoordinates)) {
                      if (this.isBottomSpotClear(ROW, COL) &&
                          this.isCurrentSpotClear(ROW, COL) &&
                          this.isLeftSpotClear(ROW, COL) &&
                          this.isTopSpotClear(ROW, COL)) {
                        continue
                      } 
                      continue nextPlacedLetter
                    }

                    // if we are at the spot to the right of the matching letter
                    if (JSON.stringify(prevSpot) === JSON.stringify(placedLetterCoordinates)) {
                      if (this.isBottomSpotClear(ROW, COL) &&
                          this.isCurrentSpotClear(ROW, COL) &&
                          this.isRightSpotClear(ROW, COL) &&
                          this.isTopSpotClear(ROW, COL)) {
                        continue
                      } 
                      continue nextPlacedLetter
                    }

                    if (this.isRightSpotClear(ROW, COL) &&
                        this.isLeftSpotClear(ROW, COL) &&
                        this.isCurrentSpotClear(ROW, COL) &&
                        this.isTopSpotClear(ROW, COL) &&
                        this.isBottomSpotClear(ROW, COL)) {
                      continue
                    }

                    continue nextPlacedLetter
                  }

                  // if we make it this far, then we know that the LETTERS have valid coordinates and are ready to be placed on grid
                  this.addToGridAndPlacedWords(LETTER_COORDINATES, LETTERS, WORD, placedWord)

                  // WORD has been placed, move on to the next word
                  continue outer
                }
              }
            }
          }
        }
      }
    },

    /**
     * @desc determines whether the new word will fit either vertically or horizontally within the grid
     * @param {object} placedWord - the word that is already in the grid
     * @param {array} placedLetterCoordinates - the coordinates of the matching letter that has been placed
     * @param {number} MATCHED_LETTER_INDEX - the index of the matching letter in the unplaced word
     * @param {number} LENGTH - length of the unplaced word
     * @return {boolean} 
     */
    fitsGrid (placedWord, placedLetterCoordinates, MATCHED_LETTER_INDEX, LENGTH) {
      let relevantCoordinate
      if (placedWord.layout === 'horizontal') {
        // get rowCoordinate of placed letter if layout is horizontal
        relevantCoordinate = placedLetterCoordinates[0]
      } else {
        // otherwise get the column coordinate
        relevantCoordinate = placedLetterCoordinates[1]
      }

      // if this evaluates to true, then the word will fit
      if (relevantCoordinate - MATCHED_LETTER_INDEX >= 0 &&
          relevantCoordinate + LENGTH - MATCHED_LETTER_INDEX <= 20) {
        return true
      }
      return false
    },

    // CHANGE THESE BACK TO OBJECT AFTER TESTING ////////////////////////////////////////////////////////////////////////////

    /**
     * @desc determines whether the current spot of unplaced letter is open
     * @param {number} ROW - row index of unplaced letter
     * @param {number} COL - col index of unplaced letter
     * @return {boolean} 
     */
    isCurrentSpotClear (ROW, COL) {
      if (this.grid[ROW][COL] === null || this.grid[ROW][COL] === undefined) {
        return true
      }
      return false
    },

    /**
     * @desc determines whether the spot to the left of unplaced letter is open
     * @param {number} ROW - row index of unplaced letter
     * @param {number} COL - col index of unplaced letter
     * @return {boolean} 
     */
    isLeftSpotClear (ROW, COL) {
      if (this.grid[ROW][COL - 1] === null || this.grid[ROW][COL - 1] === undefined) {
        return true
      }
      return false
    },

    /**
     * @desc determines whether the spot to the right of unplaced letter is open
     * @param {number} ROW - row index of unplaced letter
     * @param {number} COL - col index of unplaced letter
     * @return {boolean} 
     */
    isRightSpotClear (ROW, COL) {
      if (this.grid[ROW][COL + 1] === null || this.grid[ROW][COL + 1] === undefined) {
        return true
      }
      return false
    },

    /**
     * @desc determines whether the spot to the bottom of unplaced letter is open
     * @param {number} ROW - row index of unplaced letter
     * @param {number} COL - col index of unplaced letter
     * @return {boolean} 
     */
    isBottomSpotClear (ROW, COL) {
      if (this.grid[ROW + 1] === undefined) {
        return true
      }

      if (this.grid[ROW + 1][COL] === null || this.grid[ROW + 1][COL] === undefined) {
        return true
      }
      return false
    },

    /**
     * @desc determines whether the spot to the top of unplaced letter is open
     * @param {number} ROW - row index of unplaced letter
     * @param {number} COL - col index of unplaced letter
     * @return {boolean} 
     */
    isTopSpotClear (ROW, COL) {
      if (this.grid[ROW - 1] === undefined) {
        return true
      }

      if (this.grid[ROW - 1][COL] === null || this.grid[ROW - 1][COL] === undefined) {
        return true
      }
      return false
    },

    /**
     * @desc adds the letters to the grid and adds them to the placed words array
     * @param {array} LETTER_COORDINATES - letter coordinates for unplaced word
     * @param {array} LETTERS - letters of the unplaced word
     * @param {string} WORD - the unplaced word
     * @param {object} placedWord - the word that has been placed and contains a letter match
     */
    addToGridAndPlacedWords (LETTER_COORDINATES, LETTERS, WORD, placedWord) {
      for (let i = 0; i < LETTER_COORDINATES.length; i++) {
        const ROW = LETTER_COORDINATES[i][0]
        const COL = LETTER_COORDINATES[i][1]

        // keep track of the furthest column so we can remove unused indices from grid
        if (COL > this.furthestColumn) {
          this.furthestColumn = COL
        }
        // place these new letters onto the grid
        this.grid[ROW][COL] = {
          letter: LETTERS[i],
          partOfWord: WORD
        }
      }

      // add to placed words array
      this.placedWords.push({
        letters: LETTERS,
        word: WORD,
        coordinates: LETTER_COORDINATES,
        layout: placedWord.layout === 'vertical' ? 'horizontal' : 'vertical'
      })
    },

    /**
     * @desc removes unused rows and columns from the grid, in order to 'center' the crossword
     */
    removeUnusedSpaces () {
      // if every value in the row is null, we want to filter that out.  then remove unused columns
      this.grid = this.grid.filter(row => !row.every(col => col === null)).map(row => row.slice(0, this.furthestColumn + 1))
    },
    postToBackEnd () {
      const letterCombo = JSON.parse(JSON.stringify(this.letterCombo))

      letterCombo['grid'] = this.grid
      letterCombo['placedWords'] = this.placedWords.length

      axios({
        method: 'post',
        url: 'http://localhost:3000/post-crossword',
        data: letterCombo,
        headers: {
          'access-control-allow-origin': 'http://localhost:8080'
        }
      })
      .then(console.log)
    }
  }

}
</script>

<style lang="scss">
.crossword-container {
  .row {
    display: flex;
    justify-content: center;
    .space {
      display: flex;
      width: 2rem;
      height: 2rem;
      justify-content: center;
      align-items: center;
      border: solid 1px black;
      color: white;
      font-weight: bold;
      background: blue;
    }
  }
}
</style>
