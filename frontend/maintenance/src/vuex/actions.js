export const setProducts = makeAction('SET_PRODUCTS')
export const setUserAddressList = makeAction('SET_USER_ADDRESS_LIST')
export const setSelectedUserAddress = makeAction('SET_SELECTED_USER_ADDRESS')
export const setOrderInfo = makeAction('SET_ORDER_INFO')
export const setUserAutoModel = makeAction('SET_USER_AUTO_MODEL')
export const setLastPath = makeAction('SET_LAST_PATH')
export const setUserAutoModels = makeAction('SET_USER_AUTO_MODELS')
export const setLoading = makeAction('SET_LOADING')

// 故障项目
export const setFaultItems = ({ dispatch,state }, item) => {
  let order_items = state.orderInfo.auto_fault_items;
  let fault_items = state.faultItems;
  if (!fault_items.some(it => {
    return it.cat_id == item.cat_id || false
  })) {
    fault_items.push(item)
    order_items.push(item.id)
    
  } else {
    let a = [];
    let b = [];
    fault_items.forEach(it => {
      if (it.id != item.id && it.cat_id != item.cat_id) {
        a.push(it)
        b.push(it.id)
      }
    });

    a.push(item)
    b.push(item.id)

    order_items = b
    fault_items = a
  }
  dispatch('SET_ORDER_INFO', {auto_fault_items:order_items}) 
  dispatch('SET_FAULT_ITEMS', fault_items)
};


export const showToast = ({ dispatch,state }, toast) => {
  dispatch('SHOW_TOAST', toast);
  setTimeout(function() {
    dispatch('FINISH_TOAST')
  }, 2000);
};

export const setToast = ({ dispatch,state }, toast) => {
  dispatch('SET_TOAST', {...toast, show:true});
  setTimeout(function() {
    dispatch('FINISH_TOAST')
    setTimeout(function() {
      dispatch('SET_TOAST', {type:'text'})
    }, 200)
  }, 2000);
};
export const finishToast = makeAction('FINISH_TOAST')

export const pushLastPath = ({ dispatch,state }, lastPath) => {
  let pathList = state.last_path;
  pathList.push(lastPath);
  return dispatch('SET_LAST_PATH', pathList)
}

export const popLastPath =  ({ dispatch,state }) => {
  let pathList = state.last_path;
  let lastPath = pathList.pop();
  dispatch('SET_LAST_PATH', pathList);
  return lastPath;
}

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
