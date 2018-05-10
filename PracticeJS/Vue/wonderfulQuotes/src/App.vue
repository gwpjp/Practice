<template>
  <div id="app" class="container">
    <h1>Quotes Added</h1>
    <div class="progress">
        <div class="progress-bar" role="progressbar"  :style="{ width: progress*10 + '%' }" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
          {{progress}}/10
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      progress: 1
    }
  }
}
</script>

<style lang="scss" scoped>
  #app {
    margin: 50px auto;
  }

</style>
