export default (router) => {
    router.map({
        '/products': {
            name: 'ProductList',
            component: require('./views/Product/Index.vue')
        },
        '/products/yanghu-confirm': {
            name: 'YanghuConfirm',
            component: require('./views/Product/YanghuConfirm.vue')
        },
        '/products/confirm': {
            name: 'ProductConfirm',
            component: require('./views/Product/Confirm.vue')
        },
        'auto-models': {
            name: 'AutoModelList',
            component: require('./views/AutoModel/Index.vue')
        },
        '/reservations/order': {
            name: 'createReservation',
            component: require('./views/Reservation/Order.vue')
        },
        '/reservations/baoxian-detail/:reservationId': {
            name: 'BaoxianDetail',
            component: require('./views/Reservation/BaoxianDetail.vue')
        },
        '/reservations/success': {
            name: 'successReservation',
            component: require('./views/Reservation/Success.vue')
        },
        '/reservation/success/:reservationId': {
            name: 'successReservationHasParams',
            component: require('./views/Reservation/Success.vue')
        },
        '/reservation/detail/:reservationId': {
            name: 'detailReservation',
            component: require('./views/Reservation/Detail.vue')
        },
        '/user-address': {
            name: 'userAddressList',
            component: require('./views/UserAddress/Index.vue')
        },
        '/user-address/new': {
            name: 'newUserAddress',
            component: require('./views/UserAddress/Edit.vue')
        },
        '/user-address/:addressId': {
            name: 'editUserAddress',
            component: require('./views/UserAddress/Edit.vue')
        },
        'user-auto-models': {
            name: 'userAutoModelList',
            component: require('./views/UserAutoModel/Index.vue')
        },
        'user-auto-models/new': {
            name: 'userAutoModelNew',
            component: require('./views/UserAutoModel/Edit.vue')
        },
        'user-auto-models/:userAutoModelId': {
            name: 'userAutoModelEdit',
            component: require('./views/UserAutoModel/Edit.vue')
        },
        '/reservations': {
            name: 'reservationList',
            component: require('./views/Reservation/List.vue')
        },
        '/products/banjin': {
            name: 'Banjin',
            component: require('./views/Product/Banjin.vue')
        },
        '/products/yanghu': {
            name: 'Yanghu',
            component: require('./views/Product/Yanghu.vue')
        },
        '/products/tiemo': {
            name: 'Tiemo',
            component: require('./views/Product/Tiemo.vue')
        },
        '/products/guzhang': {
            name: 'Guzhang',
            component: require('./views/Product/Guzhang.vue')
        },
        '/products/baoxian': {
            name: 'Baoxian',
            component: require('./views/Product/Baoxian.vue')
        },
        '/products/guzhang/item': {
            name: 'GuzhangItem',
            component: require('./views/Product/GuzhangItem.vue')
        },
        '/products/guzhang/item/:itemId': {
            name: 'EditGuzhangItem',
            component: require('./views/Product/GuzhangItem.vue')
        },
        '/products/:productId': {
            name: 'ProductDetail',
            component: require('./views/Product/Detail.vue')
        }
    });

    //默认List主页
    router.redirect({
      '/':'/products',
      '*':'/products'
    });

    // 定义接口
    router.links = {

    };

    //注册路由切换前
    router.beforeEach(function (transition) {
        if (transition.to.name == 'ProductList') {
            window.location.href = '/wx/index';
        } else {
            transition.next();
        }
    });


    //注册路由切换后
    router.afterEach(function (transition) {
        //console.log('成功浏览到: ' + transition.to.path)
    });
};
