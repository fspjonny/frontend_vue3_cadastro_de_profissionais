<script setup>
import { inject } from 'vue';
import { formatDate, getMapGoogle, hideSalary, toogleSalary } from '../../assets/js/personMethods';

const dataTabRead = inject('dataApi')
</script>

<template>
    <span class="flex gap-2 ml-2 mt-2 items-center" v-if="dataTabRead.items[0].sexo ==='Masculino'">
        <i class="fa-solid fa-mars"></i>
        <span>{{ dataTabRead.items[0].sexo }}</span>
    </span>
    <span class="flex gap-2 ml-2 mt-2 items-center" v-else>
        <i class="fa-solid fa-venus"></i>
    <span>{{ dataTabRead.items[0].sexo }}</span>
    </span>

    <span class="flex gap-2 ml-2 mt-2 items-center">
        <i class="fa-solid fa-cake-candles"></i>
    <span>{{ formatDate(dataTabRead.items[0].nascimento) }}</span>
    </span>

    <span class="flex flex-col ml-2 mt-4 items-start">
        <i class="fa-solid fa-people-group"></i>
        <span class="flex flex-col">
        <span>{{ dataTabRead.items[0].mae }}</span>
        <span>{{ dataTabRead.items[0].pai }}</span>
        </span>
    </span>

    <span class="flex flex-col ml-2 mt-5 items-start">
        <i class="fa-regular fa-id-card"></i>
    <span>RG: <span>{{ dataTabRead.items[0].rg }}</span></span>
    <span>CPF: <span>{{ dataTabRead.items[0].cpf }}</span></span>
    </span>

    <span class="flex gap-2 ml-2 mt-4 items-center">
        <i class="fa-solid fa-at"></i>
        <a class="underline text-blue-500" href="mailto:{{ dataTabRead.items[0].email }}">
            {{ dataTabRead.items[0].email }}
        </a>
    </span>

    <span class="flex gap-2 ml-2 mt-4 items-center">
        <i class="fa-solid fa-phone"></i>
        <span>{{ dataTabRead.items[0].telefone }}</span>
    </span>

    <span class="flex gap-2 ml-2 mt-4 items-center">
        <i class="fa-solid fa-location-dot"></i>
        <a class="text-blue-500" :href="getMapGoogle(dataTabRead.items[0].endereco)" target="_blank">
            <p>{{ dataTabRead.items[0].endereco }}</p>
        </a>
    </span>

    <span class="flex gap-2 ml-2 mt-4 items-center">
        <i class="fa-solid fa-sack-dollar"></i>
        <span v-if="!hideSalary">R$ {{ dataTabRead.items[0].salario }}</span>
        <i class="fa-solid fa-eye btn" v-if="hideSalary" @click="toogleSalary"></i>
        <i class="fa-solid fa-eye-slash btn" v-if="!hideSalary" @click="toogleSalary"></i>
    </span>
</template>
