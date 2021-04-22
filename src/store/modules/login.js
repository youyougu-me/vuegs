//引入登录接口
import {Login} from "@/api/login"

const state = {
  token: localStorage.getItem("token") || '',
  username: localStorage.getItem("username") || '',
}

const getters = {}
const mutations = {

  SET_TOKEN(state, value) {
    state.token = value
  },
  SET_USERNAME(state, value) {
    state.username = value
  },
}

const actions = {
  login({commit}, data) {
    return new Promise((resolve, reject) => {
      Login(data).then(res => {
        let result = res.data
        commit('SET_TOKEN', result.data.token)
        commit('SET_USERNAME', result.data.username)
        localStorage.setItem("token", result.data.token)
        localStorage.setItem("username", result.data.username)
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  },
  exit({commit}) {
    return new Promise((resolve, reject) => {
      localStorage.removeItem("token")
      localStorage.removeItem("username")
      commit("SET_TOKEN", '')
      commit("SET_USERNAME", '')
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