<template>
  <div class="quote">{{quote}}</div>
</template>

<script>
export default {
  props: ['quote'],

};
</script>


<style lang="scss" scoped>
  .quote {
    border: .5px solid lightgray;
    padding: 10px;
    font-family: 'Arizonia', cursive;
    font-size: 18px;
    margin: 10px;
  }
</style>
