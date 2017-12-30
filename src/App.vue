<template>
  <div id="app">
    <!--<img src="./assets/logo.png" class="logo">-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #FFF;
    line-height: 1.428571429;
    color: #333333;
    background-color: #ffffff;
  }
  a{
    text-decoration: none;
  }
  a:link, a:hover, a:active, a:visited{
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
</style>
