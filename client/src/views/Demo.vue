<template>
  <div class="demo-view-wrapper">
    <p class="overview">For each crossword puzzle, select the given letters to form words!</p>
    <div class="mini-game-wrapper">
      <div class="puzzle-wrapper">
        <div
          :class="['space', {show: demoSubmitted}]"
          v-for="(letter, i) of letters"
          :key="i"
        >
          {{ letter }}
        </div>
      </div>
      <div class="active-letters">
        <div
          class="letter"
          v-for="(letter, i) of selected"
          :key="i"
        >
          {{ letter }}
        </div>
        <div
          class="delete-button"
          v-if="selected.length > 0"
        >
          <backspace class="backspace" />
        </div>
        <div
          :class="['submit-button', {'select': selected.length === letters.length}]"
          v-if="selected.length > 0"
        >
          submit
        </div>
      </div>
      <div class="letters-wrapper">
        <div class="letter-picker-container">
          <div
            :class="['letter', {'select': selected.indexOf(letter) > -1}]"
            v-for="(letter, i) of letterOptions"
            :key="i"
          >
            {{ letter }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div
        class="option"
        @click="handleOption"
      >
        Let's get started
      </div>
    </div>
  </div>
</template>

<script>

import Backspace from './../icons/Backspace'
/**
 * Displays demo view
 */
export default {
  name: 'Demo',
  components: {
    'backspace': Backspace
  },
  data: () => ({
    letters: ['d', 'e', 'm', 'o'],
    letterOptions: ['e', 'n', 'o', 'd', 'm'],
    selected: [],
    demoSubmitted: false,
    letterAnimationTime: 750,
    submitAnimationTime: 750,
    animationPauseAtEnd: 1000,
    totalAnimationTime: -1,
  }),
  /**
   * Determine total time for demo loop, then initialize the demo after 1.5s and set it to an interval
   */
  mounted() {
    this.totalAnimationTime = this.letters.length * this.letterAnimationTime + this.submitAnimationTime + this.animationPauseAtEnd

    setTimeout(() => {
      this.initDemo()
      setInterval(this.initDemo, this.totalAnimationTime + 100)
    }, 1500)
  },
  methods: {
    /**
     * Create timeouts for each letter to be added to this.selected. Create submit button timeout. Create clear timeout
     */
    initDemo () {
      let delay = 0

      const _addTimeout = this.addTimeout.bind(this)

      this.letters.forEach(letter => {
        _addTimeout(letter, delay)
        delay += this.letterAnimationTime
      })

      // this will trigger the word to appear in the puzzle spaces
      setTimeout(() => {
        this.demoSubmitted = true
      }, this.totalAnimationTime - this.animationPauseAtEnd - this.submitAnimationTime)

      setTimeout(() => this.clear(), this.totalAnimationTime)
    },

    /**
     * Adds letters to this.selected based on appropriate delay
     * @param {string} letter - the letter to add to the selected array
     * @param {number} delay - the ms delay for the letters placement
     */
    addTimeout (letter, delay) {
      setTimeout(() => {
        this.selected = [...this.selected, letter]
      }, delay)
    },

    /**
     * Clears the selected letters and resets demo status for next round
     */
    clear () {
      this.selected = []
      this.demoSubmitted = false
    },

    /**
     * Sets next view
     */
    handleOption () {
      this.$store.dispatch('setCurrentView', 'difficultySelect')
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";
@import "./../mediaQueries";

@keyframes select {
  10% {
    background: white;
    color: black;
    text-shadow: none;
  }
  90% {
    background: white;
    color: black;
    text-shadow: none;
  }
  100% {
    background: $color-darkblue;
    color: white;
    text-shadow: 0 1px 1px black;
  }
}

@keyframes selectSubmit {
  10% {
    background: $color-lightgreen;
    color: white;
  }
  90% {
    background: $color-lightgreen;
    color: white;
  }
  100% {
    background: white;
    color: black;
  }
}
.demo-view-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $color-transparent-white;
  border-radius: 10px;
  padding: 2rem;
  padding-bottom: 10rem; /* make room for footer */
  box-shadow: $modal-box-shadow;
  overflow: hidden;
  @include breakpoint-mobile {
    width: calc(100% - 2rem);
    padding: 1rem 1rem 10rem 1rem;
  }
  .overview {
    margin-top: 0;
    font-family: $font-family-headings;
    text-align: center;
    font-size: 1.5rem;
  }
  .mini-game-wrapper {
    .puzzle-wrapper {
      display: flex;
      justify-content: center;
      margin-bottom: 1rem;
      .space {
        display: flex;
        width: 2rem;
        height: 2rem;
        justify-content: center;
        align-items: center;
        font-family: $font-family-default;
        margin: 1px;
        line-height: 2rem;
        color: transparent;
        font-weight: bold;
        background: $color-transparent-white;
        border-radius: 4px;
        &.show {
          color: black;
        }
      }
    }
    .active-letters {
      height: 1.5rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &.errorAnimation {
        animation: shake .15s linear;
      }
      .letter {
        display: flex;
        width: 2rem;
        height: 2rem;
        justify-content: center;
        align-items: center;
        font-family: $font-family-default;
        margin: 1px;
        line-height: 2rem;
        color: black;
        background: $color-transparent-white;
        border-radius: 4px;
        font-size: 1rem;
      }
      .delete-button {
        display: flex;
        width: 2rem;
        height: 2rem;
        justify-content: center;
        align-items: center;
        margin: 1px;
        background: $color-transparent-white;
        border-radius: 4px;
        transition: background .2s ease-in-out;
        cursor: pointer;
        .backspace {
          height: 1rem;
        }
      }
      .submit-button {
        display: flex;
        height: 2rem;
        justify-content: center;
        align-items: center;
        margin: 1px;
        background: $color-transparent-white;
        border-radius: 4px;
        font-family: $font-family-headings;
        padding: 0 .5rem;
        font-size: 1rem;
        cursor: pointer;
        transition: all .2s ease-in-out;
        &.select {
          animation: selectSubmit 750ms 500ms ease-in-out;
        }
      }
    }
    .letters-wrapper {
      display: flex;
      justify-content: center;
      .letter-picker-container {
        padding: 1rem;
        align-items: center;
        position: relative;
        z-index: 1;
        background: $color-transparent-white;
        border-radius: 33px;
        margin: 0 auto;
        display: inline-flex;
      }
      .letter {
        display: flex;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background: $color-darkblue;
        line-height: 2rem;
        justify-content: center;
        align-items: center;
        margin-right: 1rem;
        font-size: 1rem;
        font-family: $font-family-default;
        color: white;
        text-shadow: 0 1px 1px black;
        box-shadow: 0 2px 4px black;
        transition: all .2s ease-in-out;
        cursor: pointer;
        &.select {
          animation: select 500ms linear;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .footer {
    background: $color-darkblue;
    padding: 2rem;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    @include breakpoint-mobile {
      padding: 2rem 1rem;
    }
    .option {
      display: inline-flex;
      padding: 1rem 3.5rem;
      color: black;
      font-family: $font-family-default;
      border-radius: 33px;
      background: white;
      transition: all .2s ease-in-out;
      cursor: pointer;
      text-align: center;
      &:hover {
        background: darken(white, 15%)
      }
      @include breakpoint-mobile {
        padding: 1rem;
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
