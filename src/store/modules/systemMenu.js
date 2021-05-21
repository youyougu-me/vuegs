import {QuerySystemMenu} from "@/api/systemMenu"

const state = {}

const getters = {}
const mutations = {

  // SET_TOKEN(state, value) {
  //   state.token = value
  // },
  // SET_USERNAME(state, value) {
  //   state.username = value
  // },
}

const actions = {
  querySystemMenu({commit}, data) {
    return new Promise((resolve, reject) => {
      QuerySystemMenu(data).then(res => {
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