export default (router) => {
  router.map({
    '/index': {
      name: 'Index',
      component: require('./view/index.vue')
    },
    '/pay': {
      name: 'Pay',
      component: require('./view/pay.vue')
    },
    '/detail': {
      name: 'Detail',
      component: require('./view/detail.vue')
    },
    '/login': {
      name: 'Login',
      component: require('./view/login.vue')
    },
    '/order': {
      name: 'Order',
      component: require('./view/order.vue')
    }
  });
  router.redirect({
    '/': '/index',
    '*': '/index'
  });
}
