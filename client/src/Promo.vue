<template>
  <div class="crossword-promo-wrapper">
    <div class="title-wrapper">
      <p class="title">Sea Scrambler</p>
      <p class="sub">
        The ultimate crossword game
      </p>
    </div>
    <div class="bubbles-wrapper">
      <div
        class="bubble-container"
        v-for="(bubble, i) of (new Array(numberOfBubbles).fill(1))"
        :key="i"
      >
        <bubble
          class="bubble"
          :width="`${Math.random() * bubbleWidthMax}px`"
          :animation="returnAnimation()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Bubble from './promo-components/Bubble'

export default {
  name: 'Promo',
  data: () => ({
    numberOfBubbles: 30,
    bubbleWidthMax: 25,
    animationMax: 10,
    animationDelayMax: 10
  }),
  methods: {
    /**
     * Returns the animation as a string. Prevent super fast animation by creating baseline at 4s
     */
    returnAnimation () {
      let timing = Math.random() * this.animationMax
      if (timing < 4) {
        timing = 4
      }

      return `up ${timing}s ${Math.random() * this.animationDelayMax}s infinite`
    }
  },
  components: {
    'bubble': Bubble
  }
}
</script>
<style lang="scss">
@import './variables';

.crossword-promo-wrapper {
  height: 130px;
  width: 500px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('./../public/promo-background-2.png');
  overflow: hidden;
  .title-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-family: $font-family-headings;
    text-shadow: 0 1px 1px white;
    text-align: center;
    .title {
      font-size: 3rem;
      margin: 0;
    }
    .sub {
      margin: 0;
      font-family: $font-family-default;
      font-size: 1.25rem;
    }
  }
  .bubbles-wrapper {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
  }
}
</style>
