<template>
  <div class="level-complete-wrapper">
    <div class="inner-wrapper">
      <div class="message">
        Congrats, level completed!
      </div>
      <div
        class="option"
        @click="handleOptionClick"
      >
        Choose new difficulty
      </div>
      <octopus-icon class="octopus" />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Octopus from './../icon-components/Octopus'

export default {
  name: 'LevelComplete',
  components: {
    'octopus-icon': Octopus
  },
  methods: {
    /**
     * Handles user selection and dispatches next view to store
     */
    handleOptionClick () {
      this.$store.dispatch('setCurrentView', 'difficultySelect')
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";
@import "./../mediaQueries";

.level-complete-wrapper {
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
  @include breakpoint-mobile {
    width: calc(100% - 2rem);
  }
  .inner-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .message {
      font-family: $font-family-headings;
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
      padding: 0 1rem;
      position: relative;
      z-index: 2;
      color: white;
      margin-bottom: 1rem;
      @include breakpoint-mobile {
        font-size: 1.5rem;
      }
    }
    .option {
      padding: 1rem 1.5rem;
      font-family: $font-family-default;
      border-radius: 33px;
      background: white;
      transition: all .2s ease-in-out;
      cursor: pointer;
      text-align: center;
      color: black;
      position: relative;
      z-index: 2;
      display: inline-flex;
      transition: background .2s ease-in-out;
      &:hover {
        background: darken(#fff, 10%);
      }
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
