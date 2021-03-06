// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './style/index.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(ElementUI)
//使用axios
Vue.use(VueAxios, axios)
Vue.use(VueLazyload, {
  lazyComponent: true
});

if (process.env.NODE_ENV == 'test') {
  Vue.prototype.URL_PREFIX = 'http://test120.suanshubang.com'
} else {
  Vue.prototype.URL_PREFIX = ''
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
