import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import data from '../../data/data.json'

export function useRouting() {
  const router = useRouter()
  const route = useRoute()

  function go(path: string) { return router.push(path) }

  return { router, route, go }
}

export function getData() {
  const items = ref(Array.isArray(data) ? data : [])

  const images = import.meta.glob('../../data/images/*', { eager: true, as: 'url' }) as Record<string, string>

  const basename = (p = '') => p.split('/').pop() ?? p

  const imgFor = (item: any) => {
    const p = item.file ?? ''
    const name = basename(p)
    const key = `../../data/images/${name}`
    if (images[key]) return images[key]
    if (p.startsWith('/')) return p
    return '/' + p
  }

  const getId = (item: any) => item.id ?? null

  const findById = (id: number) => items.value.find((i: any) => (i.id ?? null) === id) ?? null

  function getItemAttribute(item: any, attribute: string): string {
  return item[attribute] ?? ''
  }

  return { items, imgFor, getId, findById, getItemAttribute }
}