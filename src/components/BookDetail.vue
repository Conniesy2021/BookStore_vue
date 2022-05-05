<template>

  <div class="book-details" v-for="book in book">
      <img :src='book.img' class="book-img" alt={{}}>


    <div>Name: <span class="book-name">{{ book.name }}</span></div>
    <div>Price: <span class="book-price">$<strong>{{ book.price }}</strong></span></div>
    <div>Genre: <span class="book-price"><strong>{{ book.Genre }}</strong></span></div>
    <div>Summary: <span class="book-name">{{ book.description }}</span></div>
    <br>
    <button v-on:click="addToCart(book)" class="is-primary button is-medium">Add to cart</button>&nbsp;



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
  data() {
    return {
      cartBooks: {},
      allBooks: [],
      filteredBooks: [],
      book: [],


    }
  },

  created() {
    this.id = this.$route.params.id;



  },

  components: {},

  mounted() {
    this.cartBooks = this.$store.state.books
    this.getAllBooks()
  },

  methods: {


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
          id: doc.id,

        }
      })

      for (var i = 0; i < this.allBooks.length; i++) {
        if (this.allBooks[i].id == this.id) {
          this.book.push(this.allBooks[i]);
        }

      }


    }

  },
}
</script>