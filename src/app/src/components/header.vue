<template>
  <nav class="navbar  navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="goToPage('/')">MovIE</a>
      <button 
      class="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
      >
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item"><a class="nav-link" href="#" @click.prevent="goToPage('/top-movies')">Filmes Conceituados</a></li>
          <li class="nav-item"><a class="nav-link" href="#" @click.prevent="goToPage('/popular-movies')">Filmes Populares</a></li>
          <li class="nav-item"><a class="nav-link" href="#" @click.prevent="goToPage('/favorites-movies')">Filmes Favoritos</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

import { useRouting } from './scripts/router.ts'

const { go } = useRouting()

function goToPage(route: string) { go(route) }

</script>
