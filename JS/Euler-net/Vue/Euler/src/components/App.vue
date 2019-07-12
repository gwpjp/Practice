<template>
  <div id="app">
    <h2>Project Euler</h2>
    <img src="../assets/Leonhard_Euler.jpg" style="width:200px;float:right">
    <ExampleList/>
    <router-view/>
  </div>
</template>

<script>
import ExampleList from './ExampleList';

export default {
  components: { ExampleList },
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
