<template>
  <div id="app" class="container">
    <h1>Quotes Added</h1>
    <div class="progress">
        <div class="progress-bar" role="progressbar"  :style="{ width: quotes.length*10 + '%' }" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
          {{quotes.length}}/10
        </div>
    </div>
    <quote-form :quotes="quotes"></quote-form>
    <div class="row">
      <div v-for="(quote, index) in quotes" class="col-sm-6 col-md-4">
        <quote-block :quote="quote" :index="index" :quotes="quotes"></quote-block>
      </div>
    </div>
    <div class="alert alert-info text-center">
      Info - Click on a quote to delete it.
    </div>
  </div>
</template>

<script>
import quoteForm from "./components/quoteForm.vue";
import quoteBlock from "./components/quoteBlock.vue";

export default {
  name: 'app',
  data () {
    return {
      quotes: ["Just a quote to start with something"],
    }
  },
  components: {
    quoteForm,
    quoteBlock,
  },
}
</script>

<style lang="css" scoped>
  #app {
    margin: 50px auto;
  }


</style>
