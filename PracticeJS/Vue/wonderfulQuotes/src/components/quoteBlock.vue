<template>
  <div class="quote" @click="removeQuote">{{quote}}</div>
</template>

<script>
export default {
  props: ['quote', 'index', 'quotes'],
  methods: {
    removeQuote() {
      this.quotes.splice(this.index, 1);
    }
  }
};
</script>


<style lang="scss" scoped>
  .quote {
    border: .5px solid lightgray;
    padding: 10px;
    font-family: 'Arizonia', cursive;
    font-size: 18px;
    margin: 10px;
    &:hover {
      background-color: pink;
    }
  }
</style>
