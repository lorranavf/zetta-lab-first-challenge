<template>
    
  <div class="container">
    <MovieCard
      :page_title="'Filmes Conceituados'"
      :movies="movies"
      :loading="loading"
      @view-movie-details="viewMovieDetails"
    />
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @change-page="changePage"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Movie } from './scripts/tmdb_types'
import { getTopRatedMovies } from './scripts/tmdb_services'
import { useRouting } from './scripts/router'

import MovieCard from './movies.vue'
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
