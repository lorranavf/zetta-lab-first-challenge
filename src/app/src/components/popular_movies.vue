<template>
  <div class="container">
    <MovieCard
      :page_title="'Filmes populares'"
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
import { useRouting } from './scripts/router'
import { Movie } from './scripts/tmdb_types'
import { getResponseMovies } from './scripts/tmdb_services'

import Pagination from './pagination.vue'
import MovieCard from './movies.vue'

const movies = ref<Movie[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(0)

const { go } = useRouting()

const viewMovieDetails = (movieId: number) => {
  go(`/movie/${movieId}`)
}

const fetchPopularMovies = async (page = 1) => {
  loading.value = true
  try {
    const response = await getResponseMovies(page, '/movie/popular')
    movies.value = response.results
    totalPages.value = response.total_pages
    currentPage.value = response.page ?? page
  } catch (error) {
    console.error('Erro ao buscar filmes populares:', error)
    movies.value = []
    totalPages.value = 0
    currentPage.value = page
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  void fetchPopularMovies(page)
}

onMounted(() => {
  void fetchPopularMovies()
})

</script>

