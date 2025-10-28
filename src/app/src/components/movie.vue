<template>
  <div class="container">

    <div v-if="loading" class="movie-feedback">Carregando detalhes...</div>
    <div v-else-if="!movie.id" class="movie-feedback">Filme não encontrado.</div>

    <div v-else class="movie-grid">
      <div class="poster-wrapper">
        <img
          v-if="movie.poster_path"
          :src="getPosterUrl(movie.poster_path)"
          :alt="movie.title"
          class="poster"
        />
        <div v-else class="poster placeholder">Sem imagem</div>
      </div>

      <div class="movie-info">
        <h2>{{ movie.title }}</h2>
        

        <p><strong>Data de lançamento:</strong> {{ formatDate(movie.release_date) }}</p>
        <p><strong>Nota média:</strong> {{ roundVote(movie.vote_average) }}</p>
        

        <dl v-if="movie.runtime">
          <dt>Duração</dt>
          <dd>{{ movie.runtime }} min</dd>
        </dl>
        <dl v-if="movie.genres?.length">
          <dt>Gêneros</dt>
          <dd>{{ movie.genres.map((g: any) => g.name).join(', ') }}</dd>
        </dl>
        <p v-if="movie.overview" class="overview">
          <strong>Sinopse:</strong> {{ movie.overview }}
        </p>

        <div class="card-actions">
        <button class="btn btn-primary bg-dark border-dark" @click="handleFavoriteToggle(movie.id)">
          <small>{{ isMovieFavorited(movie.id) ? 'Desfavoritar | ❤️' : 'Favoritar | 🤍' }}</small>
        </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouting } from './scripts/router'
import { Movie, getMovieDetails } from './scripts/tmdb_services'
import { getPosterUrl, formatDate, roundVote } from './scripts/tmdb_utils'
import { loadFavorites, saveFavoriteMovie, removeFavoriteMovie, isMovieFavorited } from './scripts/local_services'

const handleFavoriteToggle = (movieId: number) => {
  if (isMovieFavorited(movieId)) {
    removeFavoriteMovie(movieId)
  } else {
    saveFavoriteMovie(movieId)
  }
}

const movie = ref<Movie>({} as Movie)
const loading = ref(true)
const { route } = useRouting()

onMounted(async () => {
  try {
    const movieId = Number(route.params.id)
    movie.value = movieId ? await getMovieDetails(movieId) ?? {} : {}
    loadFavorites()
  } finally {
    loading.value = false
  }
})
</script>
