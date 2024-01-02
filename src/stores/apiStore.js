import { defineStore } from 'pinia';
import { ref } from 'vue';

const DEFAULT_URL = "https://devfabiopedro.pythonanywhere.com/api/v1/persons/"

/*
  Tento obter o token se ele existir, uma variável vai receber 
  esse token e passar ao HEADERS.
*/
const user_token = ref('')
const get_token = JSON.parse(localStorage.getItem("userdata"))

/*
  Como o token não exite ainda é retornado um null, então eu crio a chave
  userdata com valor 0, pois pode ser este o primeiro acesso do usuário
  e portanto ainda não vai existir um token criado lá no backend.
*/
if(get_token === null) {
  localStorage.setItem("userdata","0")
  user_token.value = JSON.parse(localStorage.getItem("userdata")) // Set de um valor zero de retorno.
} else {
  user_token.value = JSON.parse(localStorage.getItem("userdata")) // Se userdata existe, obtenho o token e passo ao HEADERS
}

/*
 Existindo ou não um token o HEADERS vai receber algo que permitirá tratar das 
 validações de Login e tratar das possibilidades de erros de login.
*/
const DEFAULT_HEADERS = {
  "Content-Type":"application/json",
  "Authorization": `Bearer ${user_token.value.token} `
}

export const useApiStore = defineStore('api', () => {
  const apiData = ref(null)

  async function fetchApiData(url= DEFAULT_URL, headers=DEFAULT_HEADERS) {
    const response = await fetch(url, { headers })
    const colected_data = await response.json()
    apiData.value = colected_data
  }

  return {apiData, fetchApiData, DEFAULT_URL}
})
