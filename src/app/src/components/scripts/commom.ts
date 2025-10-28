import { ref } from 'vue'

const expanded = ref<number | null>(null)

export function toggleExpand(id: number | null) {
  expanded.value = expanded.value === id ? null : id
}

export function getData(dataPath= '../../data/data.json', imagesPath = '../../data/images') {

  import data from dataPath

  const items = ref(Array.isArray(data) ? data : [])

  const images = import.meta.glob(`${imagesPath}/*`, { eager: true, as: 'url' }) as Record<string, string>

  const basename = (p = '') => p.split('/').pop() ?? p

  const imgFor = (item: any) => {
    const p = item.file ?? ''
    const name = basename(p)
    const key = `${imagesPath}/${name}`
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