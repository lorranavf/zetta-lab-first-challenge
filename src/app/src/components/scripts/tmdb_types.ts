export interface PaginatedResponse {
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

export interface Review {
  author: string
  content: string
  url: string
  created_at: string
  updated_at: string
  [key: string]: any

}
