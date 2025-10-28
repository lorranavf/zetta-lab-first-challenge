<template>

    <div class="container">
        <h1>Avaliações do Filme</h1>
        <div class="row">
        <div v-if="loading">Carregando avaliações...</div>
        <div v-else>
            <div v-if="reviews.length === 0">Nenhuma avaliação encontrada para este filme.</div>
            <div v-else>
            <div v-for="review in reviews" :key="review.id" class="movies-grid">
                <div class="card-text">
                <p class="card-title">Escrito por: {{ review.author }}</p>
                <h6 class="card-subtitle mb-2 text-muted">Data: {{ formatDate(review.created_at) }}</h6>
                <p class="overview">{{ review.content }}</p>
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
import { useRouting } from './scripts/router'
import { Review } from './scripts/tmdb_types'
import { getResponseMovieReviews } from './scripts/tmdb_services'
import { formatDate } from './scripts/tmdb_utils'
import Pagination from './pagination.vue'

const { route } = useRouting()
const movieID = Number(route.params.id)

const reviews = ref<Review[]>([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(0)

const fetchMovieReviews = async (movieId: number, page = 1) => {
  if (!movieId) {
    reviews.value = []
    totalPages.value = 0
    currentPage.value = 1
    loading.value = false
    return
  }

  loading.value = true
  try {
    const response = await getResponseMovieReviews(movieId, page)
    reviews.value = response.results
    totalPages.value = response.total_pages
    currentPage.value = response.page ?? page
  } catch (error) {
    console.error('Erro ao buscar avaliações do filme:', error)
    reviews.value = []
    totalPages.value = 0
    currentPage.value = page
  } finally {
    loading.value = false
  }
}

const changePage = (page: number) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  void fetchMovieReviews(movieID, page)
}

onMounted(() => {
  void fetchMovieReviews(movieID)
})
</script>