<template>
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
      <!--
      <el-aside class="aside" v-bind:style="{width:mainLeft + 'px'}">
        <div class="aside-top" @click="toggleAside(isCollapsed)">
          <span class="el-icon-ali-category"></span>
        </div>
        <div class="menu">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapsed" background-color="#42485B" text-color="#ffffff" :default-active="$route.path"
                   router>
            <el-menu-item-group>
              <el-menu-item v-for="menu in menus" :index="menu.route"
                            :key="menu.route"><i class="el-icon-menu"></i>{{menu.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </div>
      </el-aside>
      -->
      <el-main class="main" v-bind:style="{left: mainLeft + 'px'}">
        <el-tabs v-model="activeTab" @tab-click="handleTabClick" type="card" closable @edit="handleTabsEdit">
          <el-tab-pane :key="tab.name" v-for="(tab,index) in options" :label="tab.title" :name="tab.name">{{tab.content}}
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import User from './User'

  export default {
    name: 'Main',
    components: {
      User
    },
    data () {
      return {
        menus: [
          {route: '/', name: '首页'},
          {route: '/user', name: '用户管理'},
          {route: '/psd', name: '密码管理'},
          {route: '/salary', name: '工资管理'},
          {route: '/attendence', name: '考勤管理'},
          {route: '/perform', name: '绩效管理'},
          {route: '/admin', name: '系统管理'},
          {route: '/feedback', name: '意见反馈'}
        ],
        isCollapsed: false, // true收缩false展开
        mainLeft: 200, // 64
        // tab
        tabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        activeTab: '2',
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      toggleAside (isCollapsed) {
        console.log(isCollapsed)
        if (this.isCollapsed) {
          this.isCollapsed = false
          this.mainLeft = 200
        } else {
          this.isCollapsed = true
          this.mainLeft = 64
        }
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleTabClick (tab, event) {
        console.log(tab, event)
      },
      handleTabsEdit (targetName, action) {
        console.log(targetName, action)
        if (action === 'add') {
          let newTabName = ++this.tabIndex + ''
          this.tabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          })
          this.activeTab = newTabName
        }
        if (action === 'remove') {
          let tabs = this.tabs
          let activeName = this.activeTab
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                  activeName = nextTab.name
                }
              }
            })
          }

          this.activeTab = activeName
          this.tabs = tabs.filter(tab => tab.name !== targetName)
        }
      }
    },
    computed: {
      options () {
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
    },
    mounted () {
      // 刷新时以当前路由做为tab加入tabs
      /*
      if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') === -1) {
        this.$store.commit('add_tabs', {route: '/', name: '首页'})
        this.$store.commit('add_tabs', {route: this.$route.path, name: this.$route.name})
        this.$store.commit('set_active_index', this.$route.path)
      } else {
        this.$store.commit('add_tabs', {route: '/', name: '首页'})
        this.$store.commit('set_active_index', '/')
        this.$router.push('/')
      }
      */
    }
  }
</script>

<style>
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
    padding: 5px 10px 10px 10px;
    background: #fff;
  }

  .footer {
    background: #aaa;
  }
</style>
