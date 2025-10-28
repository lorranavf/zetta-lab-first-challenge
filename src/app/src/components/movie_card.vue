<template>
    <h1>{{ page_title }}</h1>
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

              <div class="card-actions">
                <button class="btn btn-primary bg-dark border-dark" @click="viewMovieDetails(movie.id)">
                  + ver detalhes
                </button>
                <button class="btn btn-primary bg-dark border-dark" @click="handleFavoriteToggle(movie.id)">
                  <small>{{ isMovieFavorited(movie.id) ? '❤️' : '🤍' }}</small>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { getPosterUrl } from './scripts/tmdb_utils'
import { Movie } from './scripts/tmdb_services'
import { loadFavorites, saveFavoriteMovie, removeFavoriteMovie, isMovieFavorited } from './scripts/local_services'

const props = defineProps<{
  page_title: string
  movies: Movie[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'view-movie-details', movieId: number): void
}>()    

const viewMovieDetails = (movieId: number) => {
  emit('view-movie-details', movieId)
}

const handleFavoriteToggle = (movieId: number) => {
  if (isMovieFavorited(movieId)) {
    removeFavoriteMovie(movieId)
  } else {
    saveFavoriteMovie(movieId)
  }
}

onMounted(() => {
  loadFavorites()
})

</script>