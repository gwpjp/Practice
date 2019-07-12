<template>
<div>
  <div v-for="(question, index) in this.$store.state.questions" :key="index">
    <p class = "example"><strong>Example #{{index + 1}}</strong>:  {{question}}</p>
    <p>Answer: </p>
  </div>
</div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';

export default {

};
</script>
