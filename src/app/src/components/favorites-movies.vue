<template>
  <div class="container">
    <MovieCard
      :page_title="'Seus filmes favoritos'"
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
import { ref, onMounted, watch, watchEffect } from 'vue'
import MovieCard from './movie_card.vue'
import Pagination from './pagination.vue'
import { Movie, getMovieDetails } from './scripts/tmdb_services'
import { loadFavorites, getFavoriteMovies } from './scripts/local_services'
import { useRouting } from './scripts/router'

const movies = ref<Movie[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(0)

const ITEMS_PER_PAGE = 8
const favoriteIds = ref<number[]>([])
const { go } = useRouting()

let requestCounter = 0

const fetchFavoriteMovies = async (page = 1) => {
  loading.value = true
  const requestId = ++requestCounter
  try {
    const ids = favoriteIds.value

    if (ids.length === 0) {
      movies.value = []
      totalPages.value = 0
      currentPage.value = 1
      return
    }

    totalPages.value = Math.ceil(ids.length / ITEMS_PER_PAGE)
    const safePage = Math.min(Math.max(page, 1), totalPages.value)
    currentPage.value = safePage

    const start = (safePage - 1) * ITEMS_PER_PAGE
    const pageIds = ids.slice(start, start + ITEMS_PER_PAGE)

    const results = await Promise.allSettled(pageIds.map(id => getMovieDetails(id)))

    if (requestId !== requestCounter) return

    movies.value = results
      .filter((result): result is PromiseFulfilledResult<Movie | null> => result.status === 'fulfilled')
      .map(result => result.value)
      .filter((movie): movie is Movie => movie !== null)
  } catch (error) {
    console.error('Erro ao carregar filmes favoritos:', error)
    movies.value = []
    totalPages.value = 0
    currentPage.value = 1
  } finally {
    if (requestId === requestCounter) {
      loading.value = false
    }
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  void fetchFavoriteMovies(page)
}

const viewMovieDetails = (movieId: number) => {
  go(`/movie/${movieId}`)
}

watchEffect(() => {
  favoriteIds.value = getFavoriteMovies().slice()
})

watch(
  favoriteIds,
  () => {
    void fetchFavoriteMovies(1)
  },
  { deep: true }
)

onMounted(() => {
  loadFavorites()
})
</script>
