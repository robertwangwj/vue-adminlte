import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'

// 模块
import setting from './setting'

const state = {
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    setting
  }
})
