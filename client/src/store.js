/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentView: 'welcome', /* welcome, demo, difficultySelect, gameActive */
    difficulty: '', /* random, easy, medium, hard */
    gameContainerWidth: -1,
    gameContainerHeight: -1,
    currentCrosswordIndex: -1 , /* index of current puzzle within difficulty group */
    crosswords: [], /* array of crosswords for specified difficulty */
    isLevelComplete: false, /* has user reached last puzzle for selected difficulty */
    placedWords: [], /* words that user has guessed for current puzzle */
    isCrosswordComplete: false, /* has user guessed the last word in the crossword */
    bubbleTrigger: false, /* any change causes bubbles mp3 to play */
    correctTrigger: false, /* any change causes correct mp3 to play */
    incorrectTrigger: false, /* any change causes incorrect mp3 to play */
    themeTrigger: 'unset', /* volume on/off for theme mp3 */
  },
  getters: {
    currentView: state => state.currentView,
    difficulty: state => state.difficulty,
    gameContainerWidth: state => state.gameContainerWidth,
    gameContainerHeight: state => state.gameContainerHeight,
    currentCrosswordIndex: state => state.currentCrosswordIndex,
    crosswords: state => state.crosswords,
    numCrosswords: state => state.crosswords.length,
    isLevelComplete: state => state.isLevelComplete,
    placedWords: state => state.placedWords,
    isCrosswordComplete: state => state.isCrosswordComplete,
    bubbleTrigger: state => state.bubbleTrigger,
    correctTrigger: state => state.correctTrigger,
    incorrectTrigger: state => state.incorrectTrigger,
    themeTrigger: state => state.themeTrigger,
  },
  mutations: {
    setCurrentView (state, view) {
      state.currentView = view
    },
    setDifficulty (state, difficulty) {
      state.difficulty = difficulty
    },
    setGameContainerDimensions (state, { width, height }) {
      state.gameContainerWidth = width
      state.gameContainerHeight = height
    },
    setCurrentCrosswordIndex (state, index) {
      state.placedWords = []
      state.currentCrosswordIndex = index
    },
    setCrosswords (state, crosswords) {
      state.crosswords = crosswords
      state.isLevelComplete = false
    },
    setLevelComplete (state) {
      state.isLevelComplete = true
    },
    setPlacedWords (state, words) {
      state.placedWords = words
    },
    setCrosswordComplete (state) {
      state.isCrosswordComplete = !state.isCrosswordComplete
    },
    triggerPlayBubbles (state) {
      state.bubbleTrigger = !state.bubbleTrigger
    },
    triggerPlayIncorrect (state) {
      state.incorrectTrigger = !state.incorrectTrigger
    },
    triggerPlayCorrect (state) {
      state.correctTrigger = !state.correctTrigger
    },
    triggerPlayTheme (state) {
      if (state.themeTrigger === 'unset') {
        state.themeTrigger = true
        return
      }

      state.themeTrigger = !state.themeTrigger
    }
  },
  actions: {
    setCurrentView ({commit}, payload) {commit('setCurrentView', payload)},
    setDifficulty ({commit}, payload) {commit('setDifficulty', payload)},
    setCurrentCrosswordIndex ({commit}, payload) {commit('setCurrentCrosswordIndex', payload)},
    setCrosswords ({commit}, payload) {commit('setCrosswords', payload)},
    setLevelComplete ({commit}) {commit('setLevelComplete')},
    setPlacedWords ({commit}, payload) {commit('setPlacedWords', payload)},
    setCrosswordComplete ({commit}) {commit('setCrosswordComplete')},
    setGameContainerDimensions ({commit}, payload) {commit('setGameContainerDimensions', payload)},
    triggerPlayBubbles ({commit}) {commit('triggerPlayBubbles')},
    triggerPlayCorrect ({commit}) {commit('triggerPlayCorrect')},
    triggerPlayIncorrect ({commit}) {commit('triggerPlayIncorrect')},
    triggerPlayTheme ({commit}) {commit('triggerPlayTheme')}
  }
})
