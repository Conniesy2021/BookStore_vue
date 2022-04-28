<style>
@import './assets/styles/HomeView.css';
</style>

<template>
  <div class="home">
    <section class="here is-medium is-dark mb-6">
      <div class="bg hero-body has-text-centered">
        <div class="bg-grey">
          <p class="title mb-6">
            welcome to the book store
          </p>
        </div>
      </div>
    </section>

    <div class="container-fluid">
      <div class="row align-items-center justify-content-center">
        <div class="col col-12 col-sm-10 col-md-10">
          <div class="books">

            <article class="book-card" v-for="book in allBooks">
              <img :src='book.img' class="book-img" alt={{book.name}}>
              <div class="book-details">
                <div>Name: <span class="book-name">{{ book.name }}</span></div>
                <div>Author: <span class="book-author">{{ book.author || 'Anonymous' }}</span></div>
                <div>Price: <span class="book-price">$<strong>{{ book.price }}</strong></span></div>
                <div>
                  <button v-on:click="addToCart(book)" class="is-primary button is-small">Add to cart</button>&nbsp;
                  <router-link :to="{ name: 'Details', params: { id: book.id , name: book.name, description: book.description, price: book.price}}"><strong>
                    <button class="is-primary button is-small">View Details</button>
                  </strong></router-link>
                </div>


              </div>

              <div class="book-desc">
                {{ book.description.substring(0, 30) + "..." }}
              </div>
            </article>

          </div>
        </div>

      </div>
    </div>

    <div class="columns">
      <div class="is-one-fifth column" v-for="book in latestBooks"
           v-bind:key="book.id">
        <div class="box">
          <figure class="image mb-4">
            <img :src="book.get_cover_art">
          </figure>
          <div class="columns is-centered">
            <h3 class="is-size-4">{{ book.name }}</h3>
          </div>
          <div class="is-centered columns">
            <button v-on:click="addToCart(book)" class="is-primary button is-small">Add to cart
            </button>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import db from '../firebase/firebase-connection'
import {
  collection,
  getDocs
} from 'firebase/firestore'

export default {
  name: 'HomeView',
  data() {
    return {
      latestBooks: [],
      cartBooks: {},
      allBooks: []
    }
  },

  components: {},

  mounted() {
    this.getLatestBooks()
    this.cartBooks = this.$store.state.books
    this.getAllBooks()
  },

  methods: {
    getLatestBooks() {
      axios
          .get('/api/v1/latest-books')
          .then(response => {
            this.latestBooks = response.data
          })

          .catch(error => {
            console.log(error)
          })
    },
    addToCart(book) {
      if (this.cartBooks.hasOwnProperty(book.id)) {
        this.cartBooks[book.id].count++
      } else {
        this.cartBooks[book.id] = {
          'book': book,
          'count': 1
        }
      }
      this.$store.state.books = this.cartBooks
      console.log(this.$store.state.books)
      alert("added successfully")

    },


    async getAllBooks() {
      const booksCol = collection(db, 'books')

      const snapshot = await getDocs(booksCol)

      this.allBooks = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })

    }

  },
}
</script>


