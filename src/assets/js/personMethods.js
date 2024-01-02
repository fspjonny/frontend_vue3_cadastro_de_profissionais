import { format } from 'date-fns';
import { ref } from 'vue';

const formatDate = (dateValue) => {
    return format(new Date(dateValue), "dd/MM/yyyy")
}

const getMapGoogle = (address) => {
    let prepare = address.replace(/\s+/g, '+')
    return `https://www.google.com.br/maps/place/${prepare}`
}

const workInYears = (fulldate) => {
    const current = new Date().getFullYear()
    const hire = fulldate.substring(0,4)
    return current - hire
}

const hideSalary = ref(true)
const toogleSalary = () => {
    hideSalary.value = !hideSalary.value
}

const tabs = ref(['Ver Cadastro', 'Alterar Dados', 'Excluir'])
const icontab = ref({
    0:'<i class="fa-solid fa-glasses pr-2"></i>', 
    1:'<i class="fa-solid fa-pen"></i>', 
    2:'<i class="fa-solid fa-trash-can"></i>'
})
const activeTab = ref(0)
const selectedTab = (tabNumber) => {
    activeTab.value = tabNumber
}

export { activeTab, formatDate, getMapGoogle, hideSalary, icontab, selectedTab, tabs, toogleSalary, workInYears };

