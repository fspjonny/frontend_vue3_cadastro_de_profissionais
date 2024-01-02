<script setup>
import { onUpdated, provide, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
activeTab,
icontab,
selectedTab,
tabs
} from '../assets/js/personMethods';
import MenuVerticalPersonPage from '../components/person/MenuVerticalPersonPage.vue';
import TabPersonReadData from '../components/person/TabPersonReadData.vue';
import TabPersonUpdateData from '../components/person/TabPersonUpdateData.vue';
import { useApiStore } from '../stores/apiStore';

const mode = ref(localStorage.getItem('mode'))
const route = useRoute()
const userId = ref("")
const apiStore = useApiStore()
const apiData = ref()
const apiDataResolved = ref(false)
const textColor = ref('text-white')

provide('dataApi', apiData)

userId.value = route.params.id

onUpdated(()=> {
    document.querySelector("html").setAttribute("data-theme", mode.value)
    if(mode.value === 'light') {
        textColor.value = 'text-black'
    } else {
        textColor.value = 'text-white'
    }
})

const filteredData = async (params) => {
    const urlParam = `${apiStore.DEFAULT_URL}${params}`
    try {
      await apiStore.fetchApiData(urlParam)
      apiData.value = apiStore.apiData
      apiDataResolved.value = true
    } catch (error) {
      console.log("Erro ao carregar dados da API", error)
    }
}
filteredData(userId.value)
</script>

<template>
    <div v-if="apiDataResolved">
        <div class="flex flex-col sm:flex-row">
            <MenuVerticalPersonPage/>
            <div class="flex-1 bg-slate-600 p-5 overflow-auto h-screen" :class="textColor">
                <div class="flex flex-col gap-5 sm:gap-0 sm:flex-row tabs-boxed justify-center sm:justify-around">
                    <a 
                    v-for="(tab, idx) in tabs" 
                    :key="idx" 
                    :class="['tab', {'tab-active': activeTab === idx}]" 
                    @click="selectedTab(idx)">
                    <span class="mr-2" v-html="icontab[idx]"></span>
                    {{ tab }}
                    </a>
                </div>
                <div v-show="activeTab === 0">
                    <TabPersonReadData/>
                </div>
                <div v-show="activeTab === 1">
                    <TabPersonUpdateData/>
                </div>
                <div v-show="activeTab === 2">
                    <div class="flex justify-center mt-12">
                        <div role="alert" class="flex justify-center alert alert-warning w-[80%]">
                            <i class="fa-solid fa-triangle-exclamation text-3xl text-red-600"></i>
                            <span>Atenção!<br/>Exclusões não são permitidas nessa demonstração!</span>
                        </div>                        
                    </div>
                </div>
            </div>
            
        </div>

        <div class="sm:fixed sm:bottom-0 sm:left-0">
            <router-link to="/container">
                <div class="w-screen sm:w-52 h-12 sm:h-8 bg-violet-500 hover:bg-violet-400 text-center align-middle text-lg text-white font-semibold">
                    Voltar
                </div>
            </router-link>
        </div>
    </div>
    
    <div v-else>
    </div>
</template>