<template>
    
  <div class="container">
    
    <h1>Filmes populares</h1>

    <div class="row">
      <div v-if="loading">Carregando filmes...</div>
      <div v-else-if="movies.length === 0">Nenhum filme encontrado.</div>
      <div v-else class="movies-grid">
        <div class="columns" v-for="movie in movies" :key="movie.id">
          <div class="card">
            <div class="card-body">
              <img
                class="poster"
                v-if="movie.poster_path"
                :src="getPosterUrl(movie.poster_path)"
                :alt="movie.title"
              />
              <div class="card-text">
                <h6>{{ movie.title }}</h6>
                <p>Data de lançamento: {{ formatDate(movie.release_date) }}</p>
                <p>Nota: {{ roundVote(movie.vote_average) }}</p>
                <p class="overview">{{ movie.overview }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination  :current-page="currentPage" :total-pages="totalPages" @change-page="changePage"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Movie, getResponseMovies } from './scripts/tmdb_services'
import { getPosterUrl, formatDate, roundVote } from './scripts/tmdb_utils'

import Pagination from './pagination.vue'

export default defineComponent({
  name: 'PopularMoviesPaginated',
    components: {
        Pagination,
    },
  data() {
    return {
      movies: [] as Movie[],
      loading: true,
      currentPage: 1,
      totalPages: 0,
    }
  },
  methods: {
    getPosterUrl,
    formatDate,
    roundVote,
    async fetchPopularMovies(page = 1) {
      this.loading = true
      try {
        const response = await getResponseMovies(page, '/movie/popular')
        this.movies = response.results
        this.totalPages = response.total_pages
        this.currentPage = page
      } catch (error) {
        console.error('Erro ao buscar filmes populares:', error)
        this.movies = []
        this.totalPages = 0
      } finally {
        this.loading = false
      }
    },
    changePage(page: number) {
      if (page < 1 || page > this.totalPages || page === this.currentPage) return
      void this.fetchPopularMovies(page)
    },
  },
  async created() {
    await this.fetchPopularMovies()
  },
})
</script>