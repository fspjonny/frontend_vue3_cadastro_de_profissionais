import { onMounted, ref } from 'vue';
import { useApiStore } from '../../stores/apiStore';
import { scrollToAnchor } from './scrollpage';

export function useApiData() {
  const apiStore = useApiStore()
  const apiData = ref()
  const apiDataResolved = ref(false)
  const msgwarnings = ref("")

  const filteredData = async (params) => {
    const urlParam = `${apiStore.DEFAULT_URL}${params}`
    try {
      await apiStore.fetchApiData(urlParam)
      apiData.value = apiStore.apiData
      apiDataResolved.value = true
      scrollToAnchor('find_persons')
    } catch (error) {
      console.log("Erro ao carregar dados da API", error)
    }
  };  

  onMounted(async ()=> {
    try {
      await apiStore.fetchApiData();
      apiData.value = apiStore.apiData
      apiDataResolved.value = true
    } catch (error) {
      msgwarnings.value = "O servidor pode estar fora do ar, tente novamente em alguns instantes!"
      console.log("Erro ao carregar dados da API", error)
    }

  })
  return { apiData, apiDataResolved, filteredData, msgwarnings }
}



