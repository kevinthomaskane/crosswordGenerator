<template>
  <div
    :class="[
      'menu-bar-wrapper',
      {'show-options': showOptions}]"
    ref="menu-bar-wrapper"
  >
    <div
      class="button options"
      @click.stop="handleShowOptions"
    >
      <settings-icon
        :rotate="showOptions"
      />
    </div>
    <div class="options-wrapper">
      <div
        class="button home"
        @click="handleOptionClick('home')"
      >
        Home
      </div>
      <div
        class="button difficulty"
        @click="handleOptionClick('difficulty')"
      >
        Change Difficulty
      </div>
      <div
        class="button next-puzzle"
        @click="handleOptionClick('next')"
      >
        Next Puzzle
      </div>
    </div>
  </div>
</template>
<script>

import { mapGetters } from 'vuex'
import SettingsIcon from './../icons/SettingsIcon'

export default {
  name: 'MenuBar',
  components: {
    'settings-icon': SettingsIcon
  },
  data: () => ({
    showOptions: false
  }),
  methods: {
    /**
     * Handles options for menu bar items
     * @param {string} option - the option clicked
     */
    handleOptionClick (option) {
      this.showOptions = false
      
      if (option === 'home') {
        this.$store.dispatch('setCurrentView', 'welcome')
      } else if (option === 'difficulty') {
        this.$store.dispatch('setCurrentView', 'difficultySelect')
      } else if (this.currentCrosswordIndex < this.numCrosswords - 1) {
        let i = this.currentCrosswordIndex
        this.$store.dispatch('setCurrentCrosswordIndex', ++i)
      } else {
        this.$store.dispatch('setLevelComplete')
      }

      document.body.removeEventListener('click', this.handleBodyClick)
    },
    
    /**
     * Toggles class for showing options and adds listener to body for click-away close
     */
    handleShowOptions () {
      if (!this.showOptions) {
        document.body.addEventListener('click', this.handleBodyClick)
      }

      this.showOptions = !this.showOptions
    },

    /**
     * Closes menu when click isn't within menu options
     */
    handleBodyClick (e) {
      const menuBarWrapper = this.$refs['menu-bar-wrapper']

      if (!menuBarWrapper.contains(e.target)) {
        this.showOptions = false
      }
    }
  },
  computed: {
    ...mapGetters([
      'currentCrosswordIndex',
      'numCrosswords'
    ])
  }
}
</script>

<style lang="scss">
@import './../variables.scss';

.menu-bar-wrapper {
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 1;
  align-items: flex-start;
  &.show-options {
    z-index: 2;
    .options-wrapper {
      .button {
        transform: translateX(0);
      }
    }
  }
  .button {
    background: $color-transparent-white;
    border-radius: 10px;
    padding: .5rem;
    color: black;
    font-family: $font-family-headings;
    font-weight: bold;
    margin-bottom: .5rem;
    transition: background .2s ease-in-out;
    cursor: pointer;
    &:hover {
      background: darken($color-transparent-white, 5%);
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .options-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .button {
      transition: all .1s ease-in-out;
      transform: translateX(-200%);
      &:nth-child(2) {
        transition-delay: .1s;
      }
      &:nth-child(3) {
        transition-delay: .2s;
      }
    }
  }
}
</style>
