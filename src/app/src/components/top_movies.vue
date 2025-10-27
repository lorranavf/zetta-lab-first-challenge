<template>
    
  <div class="container">
    
    <h1>Filmes Conceituados</h1>

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
                <h6 class="title">{{ movie.title }}</h6>
                <p class="overview">{{ movie.overview }}</p>
              </div>

              <div class="mt-auto d-flex justify-content-end mt-3">
                <button class="btn btn-primary" @click="viewMovieDetails(movie.id)">
                  + Ver mais
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination  :current-page="currentPage" :total-pages="totalPages" @change-page="changePage"/>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Movie, getTopRatedMovies } from './scripts/tmdb_services'
import { getPosterUrl, formatDate, roundVote } from './scripts/tmdb_utils'
import { useRouting } from './scripts/router'
import Pagination from './pagination.vue'

const movies = ref<Movie[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(0)

const { go } = useRouting()

const viewMovieDetails = (movieId: number) => {
  go(`/movie/${movieId}`)
}

const fetchTopMovies = async (page = 1) => {
  loading.value = true
  try {
    const response = await getTopRatedMovies(page)
    movies.value = response.results
    totalPages.value = response.total_pages
    currentPage.value = response.page ?? page
  } catch (error) {
    console.error('Erro ao buscar filmes mais bem avaliados:', error)
    movies.value = []
    totalPages.value = 0
    currentPage.value = page
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  void fetchTopMovies(page)
}

onMounted(() => {
  void fetchTopMovies()
})
</script>
