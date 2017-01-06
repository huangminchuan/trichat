import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import $ from 'jquery';
import routes from './routes';
import App from './App';
import "./assets/css/reset.css";
import "./assets/css/common.css";

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.http.options.emulateJSON = true;
Vue.config.debug = true;
window.$ = $;
window.vue = Vue;

// 配置路由
var router=new VueRouter({});
routes(router);
router.start(App,'#app');
