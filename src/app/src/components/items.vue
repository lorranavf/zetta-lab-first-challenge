<template>
  <div class="container py-4">
    <h2>Catálogo de Culturas</h2>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="item in items" :key="getId(item)">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ getItemAttribute(item, 'name') }}</h5>

            <div>
              <img :src="imgFor(item)" class="img" :alt="getItemAttribute(item, 'name')" />
            </div>
            <br/>

            <div class="card-text flex-grow-1">
                <p class="text"><strong>Nome científico:</strong> <em>{{ getItemAttribute(item, 'scientific_name') }}</em></p>
                <p class="text"><strong>Família:</strong> <em>{{ getItemAttribute(item, 'family') }}</em></p>
                <p class="text"><strong>Descrição:</strong> <em>{{ getItemAttribute(item, 'description') }}</em></p>
            </div>
        
            <div class="mt-auto d-flex justify-content-end mt-3">
              <button class="btn btn-primary" @click="viewOnly(getId(item))">
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

import { getData } from './scripts/helpers.ts'
import { useRouting } from './scripts/router.ts'

const { go } = useRouting()
const { items, imgFor, getId, getItemAttribute } = getData()

function viewOnly(id: number | null) { if (!id) return; go(`/item/${id}`) }

</script>

