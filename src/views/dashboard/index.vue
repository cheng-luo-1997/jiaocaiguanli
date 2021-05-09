<template>
  <div class="dashboard-container">
    欢迎使用教材管理系统
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    padding: 30px;
    font-size: 32px;
    border-radius: 8px;
    background-color: #4fc08d;
    color: #fff;
    box-shadow: 0px 1px 12px -7px #000;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
