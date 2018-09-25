import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebaseInit from './firebase/firebase-init'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import './styles.scss'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/heatmap'
import 'echarts/lib/component/tooltip'

Vue.component('v-chart', ECharts)
Vue.use(ElementUI)

firebaseInit()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
