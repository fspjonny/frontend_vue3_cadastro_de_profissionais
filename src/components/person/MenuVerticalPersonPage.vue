<script setup>
import { inject } from 'vue';
import getPicture from '../../assets/js/getApiPicture';
import { formatDate, workInYears } from '../../assets/js/personMethods';

const dataApiProv = inject('dataApi')
</script>

<template>
    <div class="bg-violet-800 p-4 w-screen sm:w-52 sm:h-screen text-slate-300">
        <div class="flex-1">
            <span class="flex justify-center">
                <img class="avatar w-1/2 sm:w-32 rounded-xl sm:rounded-full" :src="getPicture(dataApiProv.items[0].sexo, dataApiProv.items[0].id)" alt="Mulher" />
            </span>
            <span class="flex flex-col items-center justify-center mt-4 text-lg sm:text-2xl">
                <div class="flex flex-col items-center">
                    <i class="fa-solid fa-id-card-clip text-2xl text-accent"></i>
                    <div class="badge badge-lg badge-accent text-center h-auto">{{ dataApiProv.items[0].cargo }}</div>
                    <div class="text-xs pt-2">Admissão em: {{ formatDate(dataApiProv.items[0].admissao) }}</div>
                    <div class="text-xs">Tempo: {{ workInYears(dataApiProv.items[0].admissao) }} anos</div>
                </div>
                <span class="mt-3 text-center font-semibold text-lg md:text-2xl">{{ dataApiProv.items[0].nome }}</span>
            </span>
        </div>
    </div>
</template>
