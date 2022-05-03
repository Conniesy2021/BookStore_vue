<template>

  <div class="home">
    <section class="here is-medium is-dark mb-6">
      <div class="bg hero-body has-text-centered">
        <div class="bg-grey">
          <p class="title mb-6">
            {{genre}}
          </p>
        </div>
      </div>
    </section>
  </div>

  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col col-12 col-sm-10 col-md-10">
        <div class="books">

          <article class="book-card" v-for="book in filteredBooks">
            <div class="book-details">
              <img :src='book.img' class="book-img" alt={{book.name}}>

              <div>Name: <span class="book-name">{{ book.name }}</span></div>
              <div>Author: <span class="book-author">{{ book.author || 'Anonymous' }}</span></div>
              <div>Price: <span class="book-price">${{ book.price }}</span></div>
              <div>Genre: <span class="book-price">{{ book.Genre }}</span></div>

              <div>
                <button v-on:click="addToCart(book)" class="is-primary button is-small">Add to cart</button>&nbsp;
                <router-link
                    :to="{ name: 'Details', params: { id: book.id , name: book.name, description: book.description, price: book.price, img: book.img, genre: book.Genre}}">
                  <strong>
                    <button class="is-primary button is-small">View Details</button>
                  </strong></router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import router from '../router'
import axios from 'axios'
import db from '../firebase/firebase-connection'
import {
  collection,
  getDocs
} from 'firebase/firestore'

export default {
  name: 'BookDetail',
  data() {
    return {
      allBooks:[],
      filteredBooks:[],



      }
  },

  components: {},
  mounted() {
    this.getAllBooks()
  },

  created() {
    this.genre = this.$route.params.thisGenre;

  },

  getBook() {

  },
  methods: {
    async getAllBooks() {
      const booksCol = collection(db, 'books')
      const snapshot = await getDocs(booksCol)
      this.allBooks = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })
      for(var i = 0; i < 5; i++)
      {
        if(this.allBooks[i].Genre == this.$route.params.thisGenre)
        {
          this.filteredBooks.push(this.allBooks[i]);
        }
      }
    }
  },
}
</script>

