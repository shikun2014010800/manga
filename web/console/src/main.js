import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons'
import router from './router'
import ServerConfig from './common/utils/ServerConfig'

Vue.use(ElementUI)
Vue.component('icon', Icon)
ServerConfig.loadServerConfig()

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  template: '<App/>',
  render: h => h(App)
})

window.onbeforeunload = function (e) {
  return 'You are about to close the Moov5 console page. All your unsaved changes will be lost!'
}
