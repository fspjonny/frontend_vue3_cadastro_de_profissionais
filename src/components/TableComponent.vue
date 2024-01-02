<script setup>
import { inject } from 'vue';
import getPicture from '../assets/js/getApiPicture';
const dataPersons = inject('dataApi')
</script>

<template>
<div class="overflow-x-auto">
    <table class="table">
    <thead>
        <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Cargo</th>
        </tr>
    </thead>
    <tbody v-for="person, idx in dataPersons.items" :key="idx">
        <tr>
        <th>
            <label>{{person.id}}</label>
        </th>
        <td>
            <div class="flex items-center space-x-3">
            <div class="avatar">
                <div class="mask mask-squircle w-16 h-16">
                <img v-if="person.sexo === 'Masculino'" :src="getPicture(person.sexo, person.id)" alt="Homem" />
                <img v-else :src="getPicture(person.sexo, person.id)" alt="Mulher" />
                </div>
            </div>
            <div>
                <div class="font-bold">{{ person.nome }}</div>
                <div class="text-sm opacity-50">{{ person.cargo }}</div>
            </div>
            </div>
        </td>
        <td>
            {{ person.cargo }}
        </td>
        <th>
            <router-link :to="'/person/' + person.id">
                <button class="btn btn-primary btn-md sm:btn-xs">Ficha completa</button>
            </router-link>
        </th>
        </tr>
    </tbody>
    </table>
</div>    
</template>