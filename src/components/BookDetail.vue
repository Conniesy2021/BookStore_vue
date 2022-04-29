<template>
  <div class="hello">
    <p class="title mb-6">Name: {{name}}</p>
    <p class="title mb-6">ID: {{ id }}</p>
    <p class="title mb-6">Price: ${{ price }}</p>
    <p class="title mb-5">Description: {{description}}</p>


  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'BookDetail',
  data() {
    return {}
  },
  created() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    this.price = this.$route.params.price;
    this.description = this.$route.params.description;

  },

  getBook() {

  },
  methods: {
    navigate() {
      router.go(-1);
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>