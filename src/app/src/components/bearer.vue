<template>
 <div class="container">
    <h3>TMDB Bearer check</h3>
    <p>Bearer presente: <strong>{{ hasBearer ? 'SIM' : 'NÃO' }}</strong></p>
    <p v-if="hasBearer">Token (mascarado): {{ maskedBearer }}</p>
</div>
</template>

<script lang="ts" setup>

const BEARER = (import.meta as any).env?.VITE_TMDB_API_KEY?? ''
const hasBearer = Boolean(BEARER)
const maskedBearer = BEARER ? `${BEARER.slice(0,6)}...${BEARER.slice(-4)}` : ''

</script>