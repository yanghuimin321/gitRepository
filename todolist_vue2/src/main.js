import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

Vue.config.productionTip = false

Vue.use(Toast,{
  type:'center',
})

new Vue({
  store:store,
  render: h => h(App),
}).$mount('#app')
