import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import VueResource from 'vue-resource'
import App from './App'
import $ from 'jquery'
import pingpp from 'pingpp-js'
import './assets/css/reset.css'
import './assets/css/common.css'

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
window.$ = $;
window.pingpp = pingpp;

// 配置路由
let router = new VueRouter({});
routes(router);
router.start(App,'#app');
