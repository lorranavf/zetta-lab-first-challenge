<template>
  <div class="container py-4">
    <div v-if="item">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <div class="img-wrapper-detail">
              <img :src="imgFor(item)" class="detail-img" :alt="getName(item)" />
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="title">{{ getName(item) }}</h5>
              <p class="text"><strong>Nome científico:</strong> {{ getScientific(item) }}</p>
              <p class="text"><strong>Família:</strong> {{ getFamily(item) }}</p>
              <p class="text"><strong>Descrição:</strong> {{ getDescription(item) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Item não encontrado.</p>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <button class="btn btn-secondary" @click="goBack">Voltar</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import data from '../data/data.json'

const images = import.meta.glob('../data/images/*', { eager: true, as: 'url' }) as Record<string, string>
const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)

const items = Array.isArray(data) ? data : []

const getId = (it: any) => it.id ?? null
const getName = (it: any) => it.nome_comum ?? it.name ?? ''
const getScientific = (it: any) => it.nome_cientifico ?? it.scientific_name ?? ''
const getFamily = (it: any) => it.familia ?? it.family ?? ''
const getDescription = (it: any) => it.descricao ?? it.description ?? ''

function basename(p: string) { if (!p) return '' ; return p.split('/').pop() ?? p }

const imgFor = (it: any) => {
  const p = it.arquivo ?? it.file ?? ''
  const name = basename(p)
  const key = `../data/images/${name}`
  if (images[key]) return images[key]
  if (p.startsWith('/')) return p
  return '/' + p
}

const item = computed(() => items.find((i: any) => getId(i) === id) ?? null)
function goBack() { router.push({ path: '/items' }) }
// function toggleExpand(id: number | null) { expanded.value = expanded.value === id ? null : id }

</script>

<style scoped>
.img-wrapper-detail { height: 320px; overflow:hidden; display:flex; align-items:center; justify-content:center; background:#f8f9fa; }
.detail-img { width:100%; height:100%; object-fit:cover; display:block; }
.text { text-align: justify; }
</style>