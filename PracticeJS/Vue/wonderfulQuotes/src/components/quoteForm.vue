<template>
  <div class="form-group">
    <label for="quote-text-area">Quote</label>
    <textarea class="form-control" id="quote-text-area" rows="3"></textarea>
    <div class="text-center">
      <button type="button" class="btn btn-primary">Add Quote</button>
    </div>
  </div>
</template>

<script>

export default {

}
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
