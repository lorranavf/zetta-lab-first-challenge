// import { tmdbRequest } from '../scripts/service'
import axios, { AxiosRequestConfig } from 'axios'

export const TMDB_BASE = 'https://api.themoviedb.org/3'
export const TMDB_BEARER = (import.meta as any).env?.VITE_TMDB_API_KEY?? ''

type Params = Record<string, string | number | boolean | undefined>

export async function tmdbRequest<Response = any>(path: string, params?: Params, config?: AxiosRequestConfig): Promise<Response> {
  if (!TMDB_BEARER) throw new Error('TMDB bearer token not configured.')

  const url = `${TMDB_BASE}${path}`
  const axiosConfig: AxiosRequestConfig = {
    method: 'GET',
    url,
    headers: {
      Authorization: `Bearer ${TMDB_BEARER}`,
      accept: 'application/json'
    },
    params,
    ...config
  }

  const res = await axios(axiosConfig)
  return res.data as Response
}

const tmdbURLS = {
  PopularMovies: '/movie/popular',
  TopRatedMovies: '/movie/top_rated',
  MovieDetails: (movieId: number) => `/movie/${movieId}`,
  MovieReviews: (movieId: number) => `/movie/${movieId}/reviews`,
  MovieVideos: (movieId: number) => `/movie/${movieId}/videos`,
  SimilarMovies: (movieId: number) => `/movie/${movieId}/similar`,
} as const


interface PaginatedResponse {
  page: number
  total_pages: number
  total_results: number
  results: Movie[]
}

export interface Movie {
  id: number
  title: string
  release_date?: string
  vote_average?: number
  poster_path?: string | null

  [key: string]: any
}

export async function getResponseMovies(page = 1, tmdb_url: string): Promise<PaginatedResponse> {
  try {
    const response = await tmdbRequest(tmdb_url, { language: 'pt-BR', page })
    const moviePage: PaginatedResponse = {
      page: response?.page ?? 1,
      total_pages: response?.total_pages ?? 0,
      total_results: response?.total_results ?? 0,
      results: Array.isArray(response?.results) ? response.results : [],
    }
    return moviePage
  } catch (err) {
    console.error('Erro ao buscar filmes:', err)
    return { page: 1, total_pages: 0, total_results: 0, results: [] }
  }
}

export async function getPopularMovies(page = 1): Promise<PaginatedResponse> {
  return getResponseMovies(page, tmdbURLS.PopularMovies)
}

export async function getTopRatedMovies(page = 1): Promise<PaginatedResponse> {
  return getResponseMovies(page, tmdbURLS.TopRatedMovies)
}

export async function getMovieDetails(movieId: number): Promise<Movie | null> {
  try {
    const movieDetails = await tmdbRequest(tmdbURLS.MovieDetails(movieId), { language: 'pt-BR' })
    return movieDetails as Movie
  } catch (err) {
    console.error(`Erro ao buscar detalhes do filme com ID ${movieId}:`, err)
    return null
  }
}
