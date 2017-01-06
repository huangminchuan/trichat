import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    originProducts: [],
    userAddressList: [],
    selectedUserAddress: 0,
    loading: false,
    toast: {
        show: false,
        type: 'text',
        time: 2000,
        width: '7.2em',
        msg: ""
    },
    orderInfo: {
        user_auto_model_id: 0,
        mobile: "",
        contact: "",
        take_car_address_id: 0,
        take_car_date: "",
        leave_type: 1,
        come_type: 1,
        products: [],
        user_remark: "",
        city_id: 11095,
        take_car_time_period: 1,
        auto_fault_items:[]
    },
    userAutoModel: {
        user_auto_model_id: 0,
        auto_model_id: 0,
        reg_time: "",
        province_id:0,
        vin: "",
        license: "",
        mileage: "",
        brand_id: 0,
        series_id: 0,
        brand_name: "",
        series_name: "",
        model_name: "",
        logo: ""
    },
    last_path: [],
    userAutoModels: [],
    faultItems: []
}


const mutations = {
    SET_FAULT_ITEMS (state, items) {
        state.faultItems = items;
    },
    SET_PRODUCTS (state, products) {
        state.originProducts = products;
    },
    SET_USER_ADDRESS_LIST (state, addresses) {
        state.userAddressList = addresses;
    },
    SET_SELECTED_USER_ADDRESS (state, addressId) {
        state.selectedUserAddress = addressId;
    },
    SET_ORDER_INFO (state, orderInfo) {
        for (let k in Object.getOwnPropertyNames(orderInfo)) {
            let key = Object.getOwnPropertyNames(orderInfo)[k];
            state.orderInfo[key] = orderInfo[key];
        }
    },
    SET_USER_AUTO_MODEL (state, userAutoModel) {
        for (let k in Object.getOwnPropertyNames(userAutoModel)) {
            let key = Object.getOwnPropertyNames(userAutoModel)[k];
            state.userAutoModel[key] = userAutoModel[key];
        }
    },
    SET_LAST_PATH (state, lastPath) {
        state.last_path = lastPath;
    },
    SET_USER_AUTO_MODELS (state, userAutoModels) {
        state.userAutoModels = userAutoModels;
    },
    SET_LOADING (state, loading) {
        state.loading = loading
    },
    SET_TOAST (state, toast) {
        state.toast = {...state.toast, ...toast};
    },
    FINISH_TOAST (state) {
        state.toast.show = false;
    },
    SHOW_TOAST (state, msg) {
        let width = (msg.length + 1) + 'em';
        state.toast = {...state.toast, ...{msg:msg,show:true,width:width}}
    }
}

export default new Vuex.Store({
    state,
    mutations
});
