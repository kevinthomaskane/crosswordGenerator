<template>
  <div ref="game-container" class="game-container">
    <!-- sounds -->
    <bubbles />
    <theme />
    <correct
      v-if="currentView === 'gameActive'"
    />
    <incorrect
      v-if="currentView === 'gameActive'"
    />
    <!--  -->

    <img class="background-image" alt="background" src="./../public/background.png"/>

    <welcome
      v-if="currentView === 'welcome'"
    />

    <demo v-if="currentView === 'demo'" />

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
import Demo from './views/Demo'
import DifficultySelect from './views/DifficultySelect'
import GameActive from './views/GameActive'
import Bubbles from './audio-components/Bubbles'
import Correct from './audio-components/Correct'
import Incorrect from './audio-components/Incorrect'
import Theme from './audio-components/Theme'
import { WINDOW_WIDTH } from './constants'

/**
 * Most-parent component that displays views based on user progress through game
 */
export default {
  name: 'App',
  components: {
    'crossword': Crossword,
    'welcome': Welcome,
    'demo': Demo,
    'difficulty-select': DifficultySelect,
    'game-active': GameActive,
    'bubbles': Bubbles,
    'correct': Correct,
    'incorrect': Incorrect,
    'theme': Theme
  },
  data: () => ({
    paddingTop: WINDOW_WIDTH <= 640 ? 64 : 32,
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
@import './variables.scss';
@import './mediaQueries.scss';

body {margin: 0}
.game-container {
  position: relative;
  box-sizing: border-box;
  /* inherent dimensions of background image are 2081 x 1611 */
  height: 100vh;
  width: calc(100vh * (2081 / 1611));
  margin: 0 auto;
  overflow: hidden;
  @include breakpoint-game-container-width {
    width: 100%;
  }
  * {
    box-sizing: border-box;
  }
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include breakpoint-game-container-width {
      width: auto;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
