import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routes from './routes'
import "./assets/normalize.css"
import './assets/styles/common.css'
import App from './App.vue'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
  }, false);
}


Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.emulateJSON = true;
Vue.config.debug = true;

// 配置路由
var router=new VueRouter({
    history: true,
    root: '/wx/maintenance'
});
routes(router);
router.start(Vue.extend(App),'#app');

//暴露路由接口调试
window.router = router;
