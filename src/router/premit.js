import router from "./index"
import store from "../store/index"

//添加白名单
const whiteRouter = ['/login', '/register']

//路由守卫
router.beforeEach((to, from, next) => {
  if (localStorage.getItem("token")) {
    if (to.path === '/login') {
      localStorage.removeItem("token")
      localStorage.removeItem("personName")
      store.commit("login/SET_TOKEN", '')
      store.commit("login/SET_personName", '')
      next()
    } else {
      next()
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
