<script setup>
import { inject } from 'vue';
const msg = inject('server_message')
</script>

<template>
    <div class="flex flex-col alert bg-slate-600 w-72">
        <span class="flex flex-row gap-4 text-white font-semibold">
            <span class="loading loading-spinner"></span>Lendo informações
        </span>
        <span class="text-xs text-center text-yellow-300 font-sans">
            {{ msg }}
        </span>
        <div class="text-center text-xs">
            <span class="block sm:hidden">
                <i class="fa-regular fa-hand-pointer text-lg"></i>
                <p>Toque na mensagem para recarregar</p>
            </span>

            <span class="hidden sm:block">
                <i class="fa-solid fa-computer-mouse text-sm"></i>
                <p>Mova o mouse na tela para recarregar</p>
            </span>
        </div>
    </div>

</template>
