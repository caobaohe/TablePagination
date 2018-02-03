import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Template from '@/components/Template'
import Main from '@/components/Main'
import Login from '@/components/Login'
import User from '@/components/User'
import Psd from '@/components/Psd'
import Salary from '@/components/Salary'
import Attendence from '@/components/Attendence'
import Perform from '@/components/Perform'
import Admin from '@/components/Admin'
import Feedback from '@/components/Feedback'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/template',
      name: 'Template',
      component: Template
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/user',
      name: '用户管理',
      component: User
    },
    {
      path: '/psd',
      name: '密码管理',
      component: Psd
    },
    {
      path: '/salary',
      name: '工资管理',
      component: Salary
    },
    {
      path: '/attendence',
      name: '考勤管理',
      component: Attendence
    },
    {
      path: '/perform',
      name: '绩效管理',
      component: Perform
    },
    {
      path: '/admin',
      name: '系统管理',
      component: Admin
    },
    {
      path: '/feedback',
      name: '意见反馈',
      component: Feedback
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
