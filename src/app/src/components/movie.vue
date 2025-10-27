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
      </div>
    </div>

    <!-- others -->

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Movie, getMovieDetails } from './scripts/tmdb_services'
import { getPosterUrl, formatDate, roundVote } from './scripts/tmdb_utils'

export default defineComponent({
  name: 'Movie',
  data() {
    return {
      movie: {} as Movie,
      loading: true,
    }
  },
  methods: {
    getPosterUrl,
    formatDate,
    roundVote,
  },
  async created() {
    try {
      const movieId = Number(this.$route.params.id)
      this.movie = movieId ? await getMovieDetails(movieId) ?? {} : {}
    } finally {
      this.loading = false
    }
  },
})
</script>

<style scoped>
.movie-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.poster-wrapper {
  display: flex;
  justify-content: center;
}

.poster {
  max-width: 100%;
  border-radius: 0.5rem;
}

.placeholder {
  align-items: center;
  background: #e5e5e5;
  color: #555;
  display: flex;
  font-weight: 600;
  height: 360px;
  justify-content: center;
  width: 240px;
  border-radius: 0.5rem;
}

.movie-info {
  .h2 {
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;
    text-align: justify;
  }

  dl {
    text-align: left;
    margin: 0.75rem 0 0;
  }

  dt {
    font-weight: 600;
  }

  .overview {
    margin-top: 1rem;
    line-height: 1.6;
    text-align: justify;
  }

  .movie-feedback {
    padding: 2rem 0;
    text-align: center;
  }
}
</style>