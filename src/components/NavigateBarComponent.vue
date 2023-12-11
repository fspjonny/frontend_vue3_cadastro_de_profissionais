<script setup>
import { reactive } from 'vue';

const parameters = reactive({
  selected_option : "",
  inputed_data : ""
})

const emit = defineEmits(['selected_data'])

const enviarEmit = (params) => {
  emit('selected_data', params)
}

</script>

<template>
<div class="navbar m-4 bg-base-100" id="find_persons">
  <div class="flex-wrap sm:flex-none gap-2">
      <input 
      type="text" 
      placeholder="Pesquisar" 
      class="input input-bordered w-full md:w-44 max-w-xs" 
      v-model="parameters.inputed_data"
      :disabled="parameters.selected_option === ''"
      />

      <select class="select select-bordered w-full md:w-32 max-w-xs" v-model="parameters.selected_option">
        <option disabled value="">Filtrar</option>
        <option value="name">Por nome</option>
        <option value="id">Por ID</option>
      </select>

      <button class="btn" :disabled="parameters.inputed_data === ''" @click="enviarEmit(parameters)">Pesquisar</button>

  </div>
</div>
</template>
