<template>
  <div class="crossword-promo-wrapper">
    <div class="title-wrapper">
      <p class="title">Sea Scrambler</p>
      <p class="sub">The ultimate crossword game</p>
    </div>
    <fish class="fish" fill="#ff6b6b" />
    <fish class="fish" fill="#eff453" />
    <fish class="fish" fill="#e2b7ff" />
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
import Fish from './promo-components/Fish'

export default {
  name: 'Promo',
  components: {
    'bubble': Bubble,
    'fish': Fish
  },
  data: () => ({
    numberOfBubbles: 30,
    bubbleWidthMax: 25,
    animationMax: 10,
    animationDelayMax: 10
  }),
  methods: {
    /**
     * Returns the animation as a string. Prevent super fast animation by creating baseline at 4s
     * @return {string} animation 
     */
    returnAnimation () {
      let timing = Math.random() * this.animationMax
      if (timing < 4) {
        timing = 4
      }

      return `up ${timing}s ${Math.random() * this.animationDelayMax}s infinite`
    }
  }
}
</script>
<style lang="scss">
@import './variables';

@keyframes swim {
  to {
    transform: translateX(600px)
  }
}

.crossword-promo-wrapper {
  height: 130px;
  width: 500px;
  position: relative;
  background-image: linear-gradient(to bottom, #00b8ff, #0896d6);
  overflow: hidden;
  .title-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    font-family: $font-family-headings;
    text-shadow: 0 1px 1px black;
    color: white;
    text-align: center;
    z-index: 2;
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
  .fish {
    position: absolute;
    right: 100%; 
    top: 50%;
    animation: swim 13s infinite linear;
    z-index: 1;
    &:nth-child(2) {
      top: 25%;
      animation: swim 15s 3s infinite linear;
    }
    &:nth-child(3) {
      top: 75%;
      animation: swim 17s 3s infinite linear;
    }
  }
  .bubbles-wrapper {
    display: flex;
    justify-content: space-evenly;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 3;
  }
}
</style>
