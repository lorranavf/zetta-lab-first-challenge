<template>
  <div class="container py-4">
    <h2>Catálogo de Culturas</h2>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="it in items" :key="getId(it)">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ getName(it) }}</h5>

            <div class="img-wrapper mt-2">
              <img :src="imgFor(it)" class="thumb-img" :alt="getName(it)" />
            </div>
            <br/>
            <div class="card-text flex-grow-1">
                <p class="text"><strong>Nome científico:</strong> <em>{{ getScientific(it) }}</em></p>
                <p class="text"><strong>Família:</strong> <em>{{ getFamily(it) }}</em></p>
                <p class="text"><strong>Descrição:</strong> <em>{{ getDescription(it) }}</em></p>
            </div>
        
            <div class="mt-auto d-flex justify-content-end mt-3">
              <button class="btn btn-primary" @click="viewOnly(getId(it))">
                Ver mais
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import data from '../data/data.json'

const images = import.meta.glob('../data/images/*', { eager: true, as: 'url' }) as Record<string, string>
const items = ref(Array.isArray(data) ? data : [])
const expanded = ref<number | null>(null)

const router = useRouter()

const getId = (it: any) => it.id ?? null
const getName = (it: any) => it.name ?? ''
const getScientific = (it: any) => it.scientific_name ?? ''
const getFamily = (it: any) => it.family ?? ''
const getDescription = (it: any) => it.description ?? ''

function basename(p: string) { if (!p) return '' ; return p.split('/').pop() ?? p }

const imgFor = (it: any) => {
  const p = it.arquivo ?? it.file ?? ''
  const name = basename(p)
  const key = `../data/images/${name}`
  if (images[key]) return images[key]
  if (p.startsWith('/')) return p
  return '/' + p
}

function viewOnly(id: number | null) { if (id === null) return; router.push({ path: `/item/${id}` }) }
</script>

<style scoped>
.img-wrapper { height: 180px; overflow: hidden; display:flex; align-items:center; justify-content:center; background:#f8f9fa; border-radius:6px; }
.thumb-img { width:100%; height:100%; object-fit:cover; display:block; }
.card { cursor: default; }
.text { text-align: justify; }
</style>