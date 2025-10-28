
import App from './App.vue'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle';

import './components/styles/common.scss'
import './components/styles/_movies.scss'
import './components/styles/_movie.scss'
import './components/styles/_pagination.scss'

import Home from './components/home.vue'
import Bearer from './components/bearer.vue'
import PopularMoviesPaginated from './components/popular_movies.vue'
import TopMovies from './components/top_movies.vue'
import Movie from './components/movie.vue'
import FavoritesMovies from './components/favorites-movies.vue';  


const routes = [
  { path: '/bearer', component: Bearer },
  { path: '/popular-movies', component: PopularMoviesPaginated },
  { path: '/top-movies', component: TopMovies },
  { path: '/movie/:id', component: Movie },
  { path: '/favorites-movies', component: FavoritesMovies },
  { path: '/', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')