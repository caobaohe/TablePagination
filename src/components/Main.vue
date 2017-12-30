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
      <el-aside class="aside" v-bind:style="{width:mainLeft + 'px'}">
        <div class="aside-top" @click="toggleAside(isCollapsed)">
          <span class="el-icon-ali-category"></span>
        </div>
        <div class="menu">
          <el-menu class="el-menu-vertical-demo" :default-openeds="[]" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapsed" background-color="#42485B" text-color="#ffffff" router="true">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i><span slot="title">导航一</span></template>
              <el-menu-item-group>
                <el-menu-item index="user">用户</el-menu-item>
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i><span slot="title">导航二</span></template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i><span slot="title">导航三</span></template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>

      </el-aside>
      <el-main class="main" v-bind:style="{left: mainLeft + 'px'}">
        <User></User>
      </el-main>
    </el-container>

  </el-container>
</template>

<script>
  import User from './User'

  export default {
    name: 'Main',
    data () {
      return {
        isCollapsed: true,
        mainLeft: 64
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
      }
    },
    components: {
      User
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
    padding: 0;
    background: #eee;
  }

  .footer {
    background: #aaa;
  }
</style>
