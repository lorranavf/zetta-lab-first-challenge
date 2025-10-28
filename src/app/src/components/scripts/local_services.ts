import { ref } from 'vue'

const FAVORITES_KEY = 'favorite-movies'
const favoritesPayload = ref<{ movieIds: number[] }[]>([{ movieIds: [] }])

export const loadFavorites = () => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY)
    if (!stored) return
    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed) && parsed[0] && Array.isArray(parsed[0].movieIds)) {
      favoritesPayload.value = parsed
    }
  } catch (error) {
    console.error('Falha ao carregar favoritos:', error)
  }
}

const persistFavorites = () => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesPayload.value))
}

export const saveFavoriteMovie = (movieId: number) => {
  const payload = favoritesPayload.value[0]
  if (!payload.movieIds.includes(movieId)) {
    payload.movieIds.push(movieId)
    persistFavorites()
  }
}

export const removeFavoriteMovie = (movieId: number) => {
  const payload = favoritesPayload.value[0]
  const index = payload.movieIds.indexOf(movieId)
  if (index !== -1) {
    payload.movieIds.splice(index, 1)
    persistFavorites()
  }
}

export const isMovieFavorited = (movieId: number): boolean => {
  return favoritesPayload.value[0].movieIds.includes(movieId)
}

export const getFavoriteMovies = (): number[] => {
  return favoritesPayload.value[0].movieIds
}