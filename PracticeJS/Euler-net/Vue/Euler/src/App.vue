<template>
  <div id="app">
    <h2>Project Euler</h2>

    <img src="./assets/Leonhard_Euler.jpg" style="width:200px;float:right">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang='scss'>
#app {
  $primary-color: magenta;

  font-family: 'Helvetica Neue';
  font-size: 14px;

  h2 {
    color: $primary-color;
  }

  #asdfasdadfa {
    color: green;
    font-weight: bold;
  }
}
</style>
