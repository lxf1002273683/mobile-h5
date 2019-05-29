import Vue from 'vue'
import App from './index.vue'
import '../../utils/lib-flexible'
import Toast from '../../plugin/Toast/toast'
import '@babel/polyfill'

Vue.config.productionTip = false

Vue.use(Toast)
new Vue({
  render: h => h(App),
}).$mount('#index')
