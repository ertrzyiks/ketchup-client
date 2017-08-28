<template>
    <div id="app">
      <h1>Open two windows with that page</h1>

      <button id="the-button">Click! {{$route.params.name }}</button>
      <ul id="content"></ul>
    </div>
</template>

<script>
module.exports = {
  name: 'logux',
  data () {
    return {
      message: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
