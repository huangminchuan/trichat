export default (router) => {
  router.map({
    '/index' : {
      name: 'Index',
      component: require('./views/Index.vue')
    },
    '/rank' : {
      name: 'Rank',
      component: require('./views/Rank.vue')
    },
    '/friend' : {
      name: 'Friend',
      component: require('./views/Friend.vue')
    },
    '/login' : {
      name: 'Login',
      component: require('./views/Login.vue')
    },
  });
  router.redirect({
    '/':'/index',
    '*':'/index'
  });
}
