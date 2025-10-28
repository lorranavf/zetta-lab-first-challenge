export function getPosterUrl(path: string | null | undefined): string {
  return path ? `https://image.tmdb.org/t/p/w300${path}` : ''
}

export function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('pt-BR')
  } catch {
    return dateStr
  }
}

export function roundVote(vote: number | undefined): string {
  return vote !== undefined ? vote.toFixed(1) : '—'
}

