<script setup>
import BigFooter from '../components/FooterComponent.vue';
import Hero from '../components/HeroComponent.vue';
import PersonsComp from '../components/PersonsComponent.vue';

import { onMounted, ref } from 'vue';

const isChecked = ref(localStorage.getItem('check')) 
const theme = ref(localStorage.getItem('mode'))

onMounted(() => {
  document.querySelector("html").setAttribute("data-theme", theme.value)
})

const muda = () => {
  theme.value = isChecked.value ? "light" : "dark"
  document.querySelector("html").setAttribute("data-theme", theme.value)
  localStorage.setItem('mode', theme.value)

  if(isChecked.value === null){
    localStorage.setItem('check', true)
  } else {
    localStorage.setItem('check', !isChecked.value)
  }
}
</script>

<template>
    <div class="bg-gradient-to-b from-slate-200 to-slate-600 w-screen, h-screen">
        <label class="swap absolute flex flex-row right-5 p-3"> 
          <!-- this hidden checkbox controls the state -->
          <input @click="muda" v-model="isChecked" type="checkbox"/>
          
          <!-- Lua icone -->
          <i v-if="isChecked" class="fa-solid fa-moon text-3xl text-black"></i>
          <!-- Sol icone -->
          <i v-else class="fa-solid fa-sun text-3xl text-white"></i>
        </label>
        
        <Hero/>
        <PersonsComp/>
        <BigFooter/>
    </div>
</template>
