<template>
  <div class="app-container">
    <p>这里是language</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

