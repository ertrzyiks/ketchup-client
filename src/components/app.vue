<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      message: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style lang="scss" src="./styles.scss"></style>
