<script setup>
import { scrollToAnchor } from '../assets/js/scrollpage';

</script>

<template>
<div class="hero min-h-screen" id="top_page">
  <div class="hero-overlay bg-opacity-60">
  </div>
  <div class="hero-content text-center text-neutral-content">
    <div class="max-w-md">
      <h1 class="mb-5 text-5xl font-bold">Bem vindo</h1>
      <p class="mb-5">Dados de um serviço de backend em Django, fornecendo via API informações para este Frontend em Vue3</p>
      <a @click="scrollToAnchor('find_persons')" class="btn btn-primary">Cadastros</a>
    </div>
  </div>
</div>    
</template>

<style scoped>
div.hero {
  background-image: url("../assets/images/building.jpg");
}
</style>