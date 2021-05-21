import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import login from './modules/login'
import systemMenu from "@/store/modules/systemMenu"


export default new Vuex.Store({
  modules: {
    login,
    systemMenu
  }
});

