// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
// import store from '@/store/index'
// import store from './vuex/store'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
// ajax
import Axios from 'axios'
// 时间处理
import moment from 'moment'

Vue.config.productionTip = false
// Vue.use(Vuex)
Vue.use(ElementUI)

Vue.prototype.$ajax = Axios
Vue.prototype.$moment = moment
Vue.prototype.$findUsers = function () {
  let _this = this
  this.$ajax.get(_this.url, {
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
