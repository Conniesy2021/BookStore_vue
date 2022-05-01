<style>
@import './assets/styles/viewAllGenres.css';

</style>

<template>
  <div class="home">
    <section class="here is-medium is-dark mb-6">
      <div class="bg hero-body has-text-centered">
        <div class="bg-grey">
          <p class="title mb-6">
            View All Genres (A - Z)
          </p>
        </div>
      </div>
    </section>
  </div>

  <div class="container-fluid">
    <div class="row align-items-center justify-content-center">
      <div class="col col-12 col-sm-10 col-md-10">
        <div class="genres">

          <article class="genre-card" v-for="genre in allGenres">
            <div> <span class="title mb-0">{{ genre }}</span></div>
            <button class="is-primary button is-small">View Books</button>&nbsp;


          </article>
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
  name: 'allGenres',
  data() {
    return {
      allBooks: [],
      allGenres: [],
    }
  },

  components: {},

  mounted() {
    this.getAllGenres()
  },

  methods: {

    async getAllGenres() {
      const booksCol = collection(db, 'books')

      const snapshot = await getDocs(booksCol)

      this.allBooks = snapshot.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id,

        }
      })

      //get all of the unique genres and display them. Will need to send a parameter to display all books from the genre.
      for(var i = 0; i < this.allBooks.length; i++)
      {
        if(!(this.allGenres.includes(this.allBooks[i].Genre)))
        {
          this.allGenres.push(this.allBooks[i].Genre);
        }
      }

      this.allGenres.sort();


    }

  },
}
</script>


