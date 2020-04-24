/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentView: 'welcome' /* welcome, demo, difficulty */
  },
  getters: {
    currentView: state => state.currentView,
  },
  mutations: {
    setCurrentView (state, view) {
        state.currentView = view
    },
  },
  actions: {
    setCurrentView ({commit}, payload) {commit('setCurrentView', payload)},
  }
})
