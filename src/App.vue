<template>
  <div id="app">
    <el-container class="container">
      <el-header class="header" height="50px">
        <div class="header-head header-left">
          <a href="#" title="#" target="_blank" class="header-logo header-btn header-left"><span
            class="el-icon-ali-RFQ-filling1"></span></a>
          <a href="#" class="header-btn header-left"><span>管理控制台</span></a>
        </div>
        <div class="header-product header-left">
          <a href="#" class="header-btn header-left"><span>产品与服务</span></a>
        </div>
        <div class="header-info header-right">
          <a href="#" class="header-btn header-left"><span class="el-icon-ali-search icon"></span><span>搜索</span></a>
          <a href="#" class="header-btn header-left"><span>消息</span></a>
          <a href="#" class="header-btn header-left"><span>费用</span></a>
          <a href="#" class="header-btn header-left"><span>工单</span></a>
          <a href="#" class="header-btn header-left"><span>备案</span></a>
          <a href="#" class="header-btn header-left"><span>企业</span></a>
          <a href="#" class="header-btn header-left"><span>支持</span></a>
          <a href="#" class="header-btn header-left"><span>用户</span></a>
          <a href="#" class="header-btn header-left"><span>简体中文</span></a>
        </div>
      </el-header>
      <el-container>
        <el-aside class="aside" v-bind:style="{width:mainLeft + 'px'}">
          <div class="aside-top" @click="toggleAside(isCollapsed)">
            <span class="el-icon-ali-category"></span>
          </div>
          <div class="menu">
            <app-nav></app-nav>
          </div>
        </el-aside>
        <el-main class="main" v-bind:style="{left: mainLeft + 'px'}">
          <el-tabs v-model="activeIndex" @tab-click="tabClick" @tab-remove="tabRemove" type="border-card" closable v-if="options.length" class="tabs">
            <el-tab-pane :key="tab.name" v-for="(tab,index) in options" :label="tab.name" :name="tab.route">
              <!--{{tab.name}}-->
              <!--<b>{{$route.name}}</b>-->
            </el-tab-pane>
            <router-view/>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AppNav from './components/common/AppNav'
  import Main from './components/Main'
  import User from './components/User'

  export default {
    name: 'app',
    components: {
      AppNav,
      Main,
      User
    },
    data () {
      return {
        isCollapsed: false, // true收缩false展开
        mainLeft: 200 // 64
      }
    },
    methods: {
      // tab切换时，动态的切换路由
      tabClick (tab) {
        let path = this.activeIndex
        console.log(path)
        // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
        if (this.activeIndex === '/userInfo') {
          path = this.activeIndex + '/' + this.$store.state.userInfo.name
        }
        this.$router.push({path: path})
      },
      tabRemove (targetName) {
        // 首页不可删除
        if (targetName === '/') {
          return
        }
        this.$store.commit('delete_tabs', targetName)
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.commit('set_active_index', this.options[this.options.length - 1].route)
            this.$router.push({path: this.activeIndex})
          } else {
            this.$router.push({path: '/'})
          }
        }
      }
    },
    computed: {
      options () {
        // debugger
        console.log(this.$store.state.options)
        return this.$store.state.options
      },
      activeIndex: {
        get () {
          return this.$store.state.activeIndex
        },
        set (val) {
          this.$store.commit('set_active_index', val)
        }
      }
    },
    watch: {
      '$route' (to) {
        let flag = false
        for (let option of this.options) {
          if (option.name === to.name) {
            flag = true
            this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
            break
          }
        }
        if (!flag) {
          this.$store.commit('add_tabs', {route: '/' + to.path.split('/')[1], name: to.name})
          this.$store.commit('set_active_index', '/' + to.path.split('/')[1])
        }
      }
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    line-height: 1.428571429;
    color: #333333;
    background-color: #ffffff;
  }

  a {
    text-decoration: none;
  }

  a:link, a:hover, a:active, a:visited {
    color: #FFF;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    /*margin-top: 10px;*/
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  .container {
    width: 100%;
    height: 100%;
    background: #eee;
    position: fixed;
    top: 0;
    bottom: 0;
  }

  .header {
    padding: 0;
    background: #373d41;
    color: #fff;
    line-height: 50px;
    overflow: hidden;
  }

  .header-head, .header-product, .header-info {
    background: #2a2f32;
  }

  .header-btn {
    display: block;
    padding: 0px 20px;
    margin-right: 1px;
    background: #373d41;
    height: 100%;
  }

  .header-left, .header-right {
    position: relative;
  }

  .header-left {
    float: left;
  }

  .header-right {
    float: right;
  }

  .header-logo {
    font-size: 18px;
  }

  .header-btn:hover {
    background: #2a2f32;
  }

  .icon {
    padding-right: 4px;
  }

  .aside-top {
    height: 30px;
    width: 100%;
    background: #4A5064;
    color: #aeb9c2;
    text-align: center;
    line-height: 30px !important;
    font-size: 12px;
    user-select: none;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
  }

  .aside {
    background: #333744;
  }

  .menu {
    background: #ffecec;
    float: left;
  }

  .el-menu-vertical-demo {
    border-right: 0;
    position: absolute;
    top: 80px;
    /*bottom: 0;*/
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .main {
    /*padding: 5px 10px 10px 10px;*/
    padding: 2px;
    background: #fff;
    min-height: 100%;
  }

  .main .tabs{
    min-height: calc(100% - 2px);
    /*height: calc(100% - 2px);*/
    /*border: 1px solid #000;*/
  }

  .footer {
    background: #aaa;
  }
</style>
