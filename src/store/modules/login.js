//引入登录接口
import {Login} from "@/api/login"

const state = {
  token: localStorage.getItem("token") || '',
  personName: localStorage.getItem("personName") || '',
}

const getters = {}
const mutations = {

  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_PERSONNAME(state, value) {
    state.personName = value
  },
}

const actions = {
  login({commit}, data) {
    return new Promise((resolve, reject) => {
      Login(data).then(res => {
        let result = res
        commit('SET_TOKEN', result.data.token)
        commit('SET_PERSONNAME', result.data.personName)
        localStorage.setItem("token", result.data.token)
        localStorage.setItem("personName", result.data.personName)
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },
  exit({commit}) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("token")
      localStorage.removeItem("personName")
      commit("SET_TOKEN", '')
      commit("SET_PERSONNAME", '')
      resolve()
    })

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}