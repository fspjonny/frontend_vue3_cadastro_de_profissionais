<script setup>
import { provide } from 'vue';
import { useApiData } from '../assets/js/getApiInfo';
import { scrollToAnchor } from '../assets/js/scrollpage';
import DataWarning from './LoadingDataAwait.vue';
import NavigateBar from './NavigateBarComponent.vue';
import PersonsTable from './TableComponent.vue';

const interval = () => {
  setInterval(window.location.reload(), 10000) //10 segundos
}
const { apiData, apiDataResolved, filteredData, msgwarnings } = useApiData();

provide('server_message', msgwarnings)
provide('dataApi', apiData)

const getEvent = (evt) => {
  if (evt.selected_option === 'name'){
    filteredData("?name="+evt.inputed_data)
  } else {
    filteredData(evt.inputed_data)
  }
}
</script>

<template>
<NavigateBar @selected_data="getEvent"/>
<div class="p-5 justify-center">
  <div v-if="apiDataResolved">
    <div class="badge badge-primary badge-outline">Registros {{ apiData.count }}</div>
    <button class="btn btn-xs btn-circle btn-outline ml-4" @click="filteredData('')">
      <i class="fa-solid fa-arrows-rotate"></i>
    </button>
    <PersonsTable/>
  </div>
  
  <div v-else class="flex flex-col items-center h-96 w-full" v-on:mousemove="interval">
    <DataWarning :server_message="msgwarnings"/>
  </div>

</div>

<div class="bg-slate-600 flex flex-wrap justify-center gap-3 p-4">
  <div class="btn-group" v-for="(link, idx) in (parseInt(apiData.count/apiData.per_page)+1)" :key="idx" v-if="apiDataResolved">
    <a class="btn btn-lg sm:btn-sm" @click="filteredData(`?page=${link}`)">{{ idx + 1 }}</a>
  </div>
</div>

<div class="justify-center sm:justify-end p-2 text-center sm:text-right">
  <button class="btn btn-circle text-2xl" @click="scrollToAnchor('top_page')">
    <i class="fa-solid fa-circle-arrow-up"></i>
  </button>
</div>

</template>