<template>

  <div class="description">
    <p class="title mb-6">View Details</p>
    <h1>{{bookId}}</h1>

  </div>



</template>

<script>
export default {
  name: "BookDetail",

  data() {

    return {
      bookId: 0,
    }
  },

  created() {
    this.bookId = this.$route.params.id;

  },
}
</script>

<style scoped>

</style>