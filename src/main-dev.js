// ==1
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import "./router/premit"
import store from './store'
import Antd from 'ant-design-vue'
import {message} from "ant-design-vue"


// ==2
Vue.use(Antd)

// ==3
Vue.config.productionTip = false
Vue.prototype.$message = message
// 颜色配置
Vue.prototype.$publicConfig = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
