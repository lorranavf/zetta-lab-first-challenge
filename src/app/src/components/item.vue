<template>
  <div class="container py-4">
    <div v-if="item">
      <div class="card">
          <div class="row g-0">

            <div class="col-md-4">
              <div>
                <img :src="imgFor(item)" class="img" :alt="getItemAttribute(item, 'name')" />
              </div>
            </div>
          

          <div class="col-md-8">
            <div>
              <h5 class="card-title">{{ getItemAttribute(item, 'name') }}</h5>
              <p class="text"><strong>Nome científico:</strong> <em>{{ getItemAttribute(item, 'scientific_name') }}</em></p>
              <p class="text"><strong>Família:</strong> <em>{{ getItemAttribute(item, 'family') }}</em></p>
              <p class="text"><strong>Descrição:</strong> {{ getItemAttribute(item, 'description') }}</p>
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

import { useRouting, getData } from './scripts/helpers.ts'

const { route, go } = useRouting()
const { imgFor, findById, getItemAttribute } = getData()

const id = Number(route.params.id)
const item = findById(id)

function goBack() { go('/items') }

</script>