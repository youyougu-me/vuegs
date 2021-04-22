import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决重复点击同一个路由报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    component: () => import('@/views/Register')
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    redirect: '/index/home',
    component: () => import('@/views/layout/Index'),
    children: [
      {
        path: "home",
        component: () => import("@/views/home/Home"),
      },
      // 各大模块的首屏是公共的
      {
        path: "setting",
        component: () => import("@/views/layout/ModuleCommonPage"),
        redirect: '/index/setting/userRole',
        children: [
          {
            path: "userRole",
            component: () => import("@/views/setting/userRole/UserRole"),
          },
          {
            path: "userManage",
            component: () => import("@/views/setting/userManage/UserManage")
          },
          {
            path: "systemMenus",
            component: () => import("@/views/setting/systemMenus/SystemMenus")
          }
        ]
      }
    ]
  },
  {
    path: '/page404',
    component: () => import('@/views/page404/Index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
