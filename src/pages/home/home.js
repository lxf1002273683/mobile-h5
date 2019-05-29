import Vue from 'vue'
import Home from './home.vue'
import '../../utils/lib-flexible'
import Toast from '../../plugin/Toast/toast'

Vue.config.productionTip = false

Vue.use(Toast)
new Vue({
  render: h => h(Home),
}).$mount('#home')
