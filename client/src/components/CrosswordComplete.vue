<template>
  <div class="crossword-complete-wrapper">
    <div class="inner-wrapper">
      <div class="message">
        Congrats, crossword completed!
      </div>
      <octopus-icon class="octopus" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import OctopusIcon from './../icons/OctopusIcon'
/**
 * First view for game that allows user to select 'Demo' or 'Start'
 */
export default {
  name: 'CrosswordComplete',
  components: {
    'octopus-icon': OctopusIcon
  },
  data: () => ({
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

.crossword-complete-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $color-darkblue;
  border-radius: 10px;
  height: 200px;
  width: 50%;
  overflow: hidden;
  border: solid 5px white;
  box-shadow: $modal-box-shadow; 
  .inner-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    .message {
      font-family: $font-family-headings;
      font-size: 2rem;
      font-weight: bold;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% - 2rem);
      text-align: center;
      z-index: 2;
      color: white;
    }
    .octopus {
      height: 225px;
      position: absolute;
      left: -50px;
      bottom: -50px;
    }
  }
}
</style>
