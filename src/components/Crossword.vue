<template>
  <div class="crossword-container">
    <h1>{{ letterCombo.letters }}</h1>
  </div>
</template>
<script>
/* eslint-disable */

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
      placedWords: []
    }
  },
  mounted () {
    this.setStartingGrid()
    this.placeFirstWord()
    this.fillGrid()
  },
  methods: {
    /**
     * @desc creates an array filled with 20 arrays each 20 indices long, or a 20x20 grid. Each sub-index represents a space on the crossword puzzle. A 0 indicates that the space is empty, while an object with the following structure represents a filled space: {letter: 'a', partOfWord: 'apple'}
     */
    setStartingGrid () {
      const grid = []
      while (grid.length < 20) {
        const row = new Array(20).fill(0)
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
        /* this.grid[9][i] = { */
        /* letter: letters[i], */
        /* partOfWord: word */
        /* } */
        this.grid[9][i] = letters[i]
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
                        (this.grid[ROW + 1][COL] === 0 || this.grid[ROW + 1][COL] === undefined) &&
                        (this.grid[ROW - 1][COL] === 0 || this.grid[ROW - 1][COL] === undefined)) {
                      continue
                    }

                    // indicates we are in the last column without an adjacent letter
                    if (this.grid[ROW][COL + 1] === undefined && this.grid[ROW][COL - 1] === 0) {
                      continue
                    }

                    // indicates we are in the first column without an adjacent letter
                    if (this.grid[ROW][COL - 1] === undefined && this.grid[ROW][COL + 1] === 0) {
                      continue
                    }

                    // if any of these eval to false, we know that the spot is either filled or adjacent to another letter
                    if (this.grid[ROW][COL] !== 0 ||
                        this.grid[ROW][COL + 1] !== 0  ||
                        this.grid[ROW][COL - 1] !== 0) {

                      // this word doesn't fit at the current letter, so go to the next letter in the placed word
                      continue nextPlacedLetter
                    }
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
                        (this.grid[ROW][COL + 1] === 0 || this.grid[ROW][COL + 1] === undefined) &&
                        (this.grid[ROW][COL - 1] === 0 || this.grid[ROW][COL - 1] === undefined)) {
                      continue
                    }

                    // indicates we are in the last row without a letter above
                    if (this.grid[ROW + 1][COL] === undefined && this.grid[ROW - 1][COL] === 0) {
                      continue
                    }

                    // indicates we are in the first row without a letter below
                    if (this.grid[ROW - 1][COL] === undefined && this.grid[ROW + 1][COL] === 0) {
                      continue
                    }

                    // if any of these eval to false, we know that the spot is either filled or adjacent to another letter
                    if (this.grid[ROW][COL] !== 0 ||
                        this.grid[ROW + 1][COL] !== 0 ||
                        this.grid[ROW - 1][COL] !== 0 ||
                        this.grid[ROW][COL + 1] !== 0) {
                      // this word doesn't fit at the current letter, so go to the next letter in the placed word
                      continue nextPlacedLetter
                    }
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
      console.table(this.grid)
      console.log(this.placedWords.length)
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

        // place these new letters onto the grid
        /* this.grid[ROW][COL] = {
         *   letter: LETTERS[i],
         *   partOfWord: WORD
         * }
         */
        this.grid[ROW][COL] = LETTERS[i]
      }

      // add to placed words array
      this.placedWords.push({
        letters: LETTERS,
        word: WORD,
        coordinates: LETTER_COORDINATES,
        layout: placedWord.layout === 'vertical' ? 'horizontal' : 'vertical'
      })
    }
  }

}
</script>
