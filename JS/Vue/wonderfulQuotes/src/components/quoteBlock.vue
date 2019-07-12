<template>
  <div class="quote" @click="removeQuote">{{quote}}</div>
</template>

<script>
export default {
  props: {
      quote: {
        type: String,
        required: true,
      },
    index: {
      type: Number,
      required: true,
    },
    quotes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeQuote() {
      this.quotes.splice(this.index, 1);
    }
  }
};
</script>


<style lang="css" scoped>
  .quote {
    border: .5px solid lightgray;
    padding: 10px;
    font-family: 'Arizonia', cursive;
    font-size: 18px;
    margin: 10px;
  }

  .quote:hover {
    background-color: pink;
  }
</style>
