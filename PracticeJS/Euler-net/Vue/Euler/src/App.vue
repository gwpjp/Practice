<template>
  <div id="app">
    <h2>Project Euler</h2>
    <img src="./assets/Leonhard_Euler.jpg" style="width:200px;float:right">
    <div v-for="(question, index) in questions" :key="index">
      <p class = "example"><strong>Example #{{index + 1}}</strong>:  {{question}}</p>
      <p>Answer: </p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import questions from './data/data';

export default {
  name: 'App',
  data() {
    return {
      questions,
    };
  },
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
