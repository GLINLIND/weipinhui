import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city:{
      name:'北京',
      code:1
    },
    // 显示转发
    showMenu:false,
  },
  mutations: {
    // 修改城市名字
    setCityName(state,status){
      state.city = status;
    },
    setMenu(state,status){
      state.showMenu = status;
    }
  },
  actions: {
  },
  modules: {
  }
})
