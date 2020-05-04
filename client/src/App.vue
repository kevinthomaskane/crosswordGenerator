<template>
  <div ref="game-container" class="game-container">
    <!-- sounds -->
    <bubbles />
    <correct />
    <incorrect />
    <!--  -->

    <img class="background-image" alt="background" src="./../public/background.png"/>
    <welcome
      v-if="currentView === 'welcome'"
    />
    <difficulty-select
      v-if="currentView === 'difficultySelect'"
    />
    <game-active
      v-if="currentView === 'gameActive'"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import Crossword from './components/Crossword'
import Welcome from './views/Welcome'
import DifficultySelect from './views/DifficultySelect'
import GameActive from './views/GameActive'
import Bubbles from './audio-components/Bubbles'
import Correct from './audio-components/Correct'
import Incorrect from './audio-components/Incorrect'

/**
 * Most-parent component that displays views based on user progress through game
 */
export default {
  name: 'App',
  components: {
    'crossword': Crossword,
    'welcome': Welcome,
    'difficulty-select': DifficultySelect,
    'game-active': GameActive,
    'bubbles': Bubbles,
    'correct': Correct,
    'incorrect': Incorrect,
  },
  data: () => ({
    paddingTop: 32,
    paddingBottom: 32
  }),
  mounted () {
    this.$nextTick(this.getGameContainerDimensions)
  },
  methods: {
    /**
     * Get the dimensions of the game container so that the crossword can scale appropriately
     */
    getGameContainerDimensions () {
      const container = this.$refs['game-container']

      this.$store.dispatch('setGameContainerDimensions', {
        width: container.offsetWidth,
        height: container.offsetHeight - this.paddingTop - this.paddingBottom
      })
    },
  },
  computed: {
    ...mapGetters([
      'currentView'
    ])
  }
}
</script>

<style lang="scss">
.game-container {
  position: relative;
  box-sizing: border-box;
  /* inherent dimensions of background image are 2081 x 1611 */
  height: 90vh;
  width: calc(90vh * (2081 / 1611));
  margin: 0 auto;
  overflow: hidden;
  * {
    box-sizing: border-box;
  }
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
