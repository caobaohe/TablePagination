<!--路由显示模板-->
<template>
  <div class="router-template">
    <div>template</div>
    <div class="template-wrap">
      {{$route.name}}
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Template'
  }
</script>
<style>
  .router-template {
    color: #000;
    font-size: 20px;
    font-weight: 700;
    height: 100%;
  }
  .template-wrap {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
</style>
