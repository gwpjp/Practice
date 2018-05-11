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
  props: {
    quotes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      quoteInput: '',
    };
  },
  methods: {
    addQuote() {
      if (this.quoteInput) {
        if (this.quotes.length < 10) {
          this.quotes.push(this.quoteInput);
        } else {
          alert("Already at maximum number of quotes!");
        }
      } else {
        alert("Your quote is empty!")
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
