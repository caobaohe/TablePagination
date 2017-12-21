import Vue from 'vue'
import Router from 'vue-router'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// ajax
import Axios from 'axios'
// 时间处理
import moment from 'moment'
import HelloWorld from '@/components/HelloWorld'
import User from '@/components/User'

Vue.use(Router)
Vue.use(ElementUI)

Vue.prototype.$ajax = Axios
Vue.prototype.$moment = moment
Vue.prototype.$findUsers = function () {
  let _this = this
  this.$ajax.get(this.url, {
    params: {
      pageNum: _this.pageNum,
      pageSize: _this.pageSize
    }
  })
    .then(function (res) {
      _this.tableData = res.data.lists
      _this.totalCount = res.data.totalCount
    })
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
