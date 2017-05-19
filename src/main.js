import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import './assets/css/base.css'
import 'mint-ui/lib/style.css'
import router from './router.config.js'
import Axios from 'axios'
Vue.prototype.$ajax = Axios
Vue.prototype.$mui = mui
Vue.use(MintUI)
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
