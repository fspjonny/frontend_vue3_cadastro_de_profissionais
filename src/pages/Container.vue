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
        <div class="absolute flex flex-row items-center right-0 p-2 gap-2">
            <i v-if="isChecked" class="fa-solid fa-moon text-xl"></i>
            <i v-else class="fa-solid fa-sun text-xl"></i>
            <input @click="muda" v-model="isChecked" type="checkbox" class="toggle opacity-50" :checked="isChecked"/>
        </div>

        <Hero/>
        <PersonsComp/>
        <BigFooter/>
    </div>
</template>
