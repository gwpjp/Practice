<template>
  <div class="form-group">
    <label for="quote-text-area">Quote</label>
    <textarea class="form-control" id="quote-text-area" rows="3" v-model="quoteInput" placeholder="Type quote here."></textarea>
    <div class="text-center">
      <button type="button" class="btn btn-primary" @click="addQuote">Add Quote</button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['quotes'],
  data() {
    return {
      quoteInput: '',

    };
  },
  methods: {
    addQuote() {
      if (this.quotes.length < 10) {
        let input = this.quoteInput ? this.quoteInput : "Quote";
        this.quotes.push(input);
      } else {
        alert("Already at maximum number of quotes!");
      }

    }
  }
};
</script>


<style lang="scss" scoped>
  .form-group {
    width: 80%;
    margin: 20px auto;
  }

  label {
    font-weight: bold
  }

  button {
    margin: 10px;
  }

</style>
