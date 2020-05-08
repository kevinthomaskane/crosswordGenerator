import Vue from 'vue'
import App from './App.vue'
// import Promo from './Promo.vue'
import store from './store'

Vue.config.productionTip = false

// crossword
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

// promo
// new Vue({
//   render: h => h(Promo),
// }).$mount('#app')
