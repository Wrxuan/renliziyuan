// 手动输入组件
// import PageTools from './PageTools/index.vue'
// const components = [PageTools]

// 引入要注册的组件
// 把组件用数组收集起来

// Vue.use(pligin)
// pligin对象install属性 ==》会被执行install方法==》第一个参数Vue
// 函数 被install方法==》会被执行 函数 第一个参数Vue
// Vue.use({})

// 实现组件的自动注册
import * as filters from '@/filters'
const fn = require.context('./', true, /\.vue$/)
console.log(fn.keys())
console.log(fn('./PageTools/index.vue'))// 根据路径查找模块

const components = fn.keys().map(ele => {
  return fn(ele)
})
// 一次性导入所有模块
export default (Vue) => {
  components.forEach(ele => {
    // console.log(ele)
    // './Breadcrumb/index.vue'.split('/')[1]
    Vue.component(ele.default.name, ele.default)
  })
  Object.keys(filters).forEach(key => {
    // 注册过滤器
    Vue.filter(key, filters[key])
  })
}

