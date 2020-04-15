<template>
  <div class="crossword-container">
    <h1>{{ letterCombo.letters }}</h1>
  </div>
</template>
<script>
/* eslint-disable */

/**
 * @desc constructs an html string to be appended to results container for each result
 * @param {string} root - the actual word
 * @param {string} pos - part of speech
 * @param {string} definition - the definition
 * @param {array} synonyms - synonyms of result
 * @param {array} antonyms - antonyms of result
 * @param {number} num - the index of the result within results array, used for creating numerical list. global namespace css issues occur when relying on default ol styling.
 * @return {string} - html string of result
 */

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
          for (let k = 0; k < placedWord.letters.length; k++) {
            
            // if true, indicates that the placedWord and WORD share a common letter
            if (LETTERS.indexOf(placedWord.letters[k]) > - 1) {
              const MATCHED_LETTER_INDEX = LETTERS.indexOf(placedWord.letters[k])
              const placedLetterCoordinates = placedWord.coordinates[k]

              // check to see if the word will fit in the grid
              const fitsGrid = this.fitsGrid(placedWord, placedLetterCoordinates, MATCHED_LETTER_INDEX, LETTERS.length)

              if (fitsGrid) {

                // keep track of where the new letters should be placed in the grid
                const unplacedLetterCoordinates = []

                if (placedWord.layout === 'horizontal') {

                  // loop through letters and give them a coordinate based on where the match exists
                  for (let i = 0; i < LETTERS.length; i++) {
                    const row = placedLetterCoordinates[0] - (MATCHED_LETTER_INDEX - i)
                    const col = placedLetterCoordinates[1]
                    unplacedLetterCoordinates.push([row, col])
                  }

                  // check to see whether the unplaced letter coordinates are surrounded by 0's on left and right

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
    }
  }

}
</script>
