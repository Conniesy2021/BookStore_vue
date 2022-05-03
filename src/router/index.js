import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CartView from '../views/CartView'
import Register from '../components/Register'
import LoginView from "@/views/LoginView";
import BookDetail from "@/components/BookDetail";
import scienceBooks from "@/components/scienceBooks";
import historyBooks from "@/components/historyBooks";
import artBooks from "@/components/artBooks";
import novelBooks from "@/components/novelBooks";
import viewAllGenres from "@/components/viewAllGenres";
import genreBooks from "@/components/genreBooks";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },

    {
        path: '/all',
        name:  'allBooks',
        component: genreBooks

    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView,
    },
    {
        path:'/register',
        name: 'Register',
        component: Register
    } ,

    {
        path:'/log-in',
        name: 'Login',
        component: LoginView
    } ,

    {
        path:'/details/:id',
        name: 'Details',
        component: BookDetail
    },

    {
        path: '/science',
        name: 'science',
        component: scienceBooks
    },

    {
        path: '/history',
        name: 'history',
        component: historyBooks
    },

    {
        path: '/art',
        name: 'art',
        component: artBooks
    },

    {
        path: '/novel',
        name: 'novel',
        component: novelBooks
    },

    {
        path: '/allGenres',
        name: 'allGenres',
        component: viewAllGenres
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
