import { ref } from 'vue'

const expanded = ref<number | null>(null)

export function toggleExpand(id: number | null) {
  expanded.value = expanded.value === id ? null : id
}
