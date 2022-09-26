import router from '@/router'
import store from './store'
const whitelist = ['/login', '/404']
router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   next()
// 1.判断token是否存在
// 1.1存在 处于登录状态 是否去往登录页 处于 则去首页 否则 放行
// 1.2不存在 不处于登录状态 去往页面 是否处于白名单 处于 则放行 否则登录页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whitelist.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
