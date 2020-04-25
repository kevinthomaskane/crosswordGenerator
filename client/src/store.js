/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentView: 'welcome', /* welcome, demo, difficultySelect, gameActive */
    difficulty: ''
  },
  getters: {
    currentView: state => state.currentView,
    difficulty: state => state.difficulty,
  },
  mutations: {
    setCurrentView (state, view) {
        state.currentView = view
    },
    setDifficulty (state, difficulty) {
      state.difficulty = difficulty
    },
  },
  actions: {
    setCurrentView ({commit}, payload) {commit('setCurrentView', payload)},
    setDifficulty ({commit}, payload) {commit('setDifficulty', payload)},
  }
})
