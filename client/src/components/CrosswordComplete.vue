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
import Octopus from './../icon-components/Octopus'

export default {
  name: 'CrosswordComplete',
  components: {
    'octopus-icon': Octopus
  },
}
</script>

<style lang="scss">
@import "./../variables";
@import "./../mediaQueries";

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
  @include breakpoint-mobile {
    width: calc(100% - 2rem);
  }
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
      @include breakpoint-mobile {
        font-size: 1.5rem;
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
