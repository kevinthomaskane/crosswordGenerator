<template>
  <div class="welcome-view-wrapper">
    <h1 class="welcome-header">Welcome to Sea Scrambler!</h1>
    <div class="options-wrapper">
      <div
        :class="['option primary', {active: activeOption !== 'demo'}]"
        @click="handleOptionClick()"
      >
        Let's get started
      </div>
      <div 
        :class="['option', {active: activeOption === 'demo'}]"
        @mouseover="handleOptionHighlight('demo')"
        @mouseleave="handleOptionHighlight()"
        @click="handleOptionClick('demo')"
      >
        How to play
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

/**
 * First view for game that allows user to select 'Demo' or 'Start'
 */
export default {
  name: 'Welcome',
  data: () => ({
    activeOption: ''
  }),
  methods: {
    /**
     * Handles user selection and dispatches next view to store
     * @param {string} view - the next view to display
     */
    handleOptionClick (view) {
      if (view === 'demo') {
        this.$store.dispatch('setCurrentView', 'demo')
        return
      }

      this.$store.dispatch('setCurrentView', 'difficultySelect')
    },

    /**
     * Handles highlighting of options buttons
     * @param {string} option - the option to highlight, empty string indicates that 'Start' option should be highlighted
     */
    handleOptionHighlight (option='') {
      this.activeOption = option
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";

.welcome-view-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $color-transparent-white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: $modal-box-shadow;
  .welcome-header {
    font-size: 2rem;
    font-family: $font-family-headings;
    margin: 0;
    margin-bottom: 1.5rem;
    text-align: center;
    white-space: nowrap;
  }
  .options-wrapper {
    .option {
      width: 100%;
      padding: 1rem 1.5rem;
      color: black;
      font-family: $font-family-default;
      border: solid 3px $color-darkblue;
      border-radius: 33px;
      background: white;
      transition: all .2s ease-in-out;
      cursor: pointer;
      box-shadow: 0 10px 11px 3px $color-lightblue;
      text-align: center;
      &.active {
        background: $color-darkblue;
        color: white;
      }
      &.primary {
        margin-bottom: 1rem;
      }
      &:hover {
        background: $color-darkblue;
        color: white;
        box-shadow: 0 10px 11px 3px rgba(84, 187, 215, 0.68);
        transform: translateY(-1px);
      }
    }
  }
}
</style>
