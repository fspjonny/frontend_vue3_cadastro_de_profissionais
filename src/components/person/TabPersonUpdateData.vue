<script setup>
import { computed, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApiStore } from '../../stores/apiStore';
import ModalPersonUpdate from './ModalPersonUpdate.vue';

const dataTabUpdate = inject('dataApi')
const route = useRoute()
const dataUpdate = useApiStore()

const alertColor = ref("")
const alertTitle = ref("")
const alertMsg = ref("")

const user_token = ref(JSON.parse(localStorage.getItem("userdata")))

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com(\.[a-zA-Z]{3,})?)$/

const nome = ref(dataTabUpdate._rawValue.items[0].nome)
const sexo = ref(dataTabUpdate._rawValue.items[0].sexo)
const nascimento = ref(dataTabUpdate._rawValue.items[0].nascimento)
const mae = ref(dataTabUpdate._rawValue.items[0].mae)
const pai = ref(dataTabUpdate._rawValue.items[0].pai)
const rg = ref(dataTabUpdate._rawValue.items[0].rg)
const cpf = ref(dataTabUpdate._rawValue.items[0].cpf)
const email = ref(dataTabUpdate._rawValue.items[0].email)
const telefone = ref(dataTabUpdate._rawValue.items[0].telefone)
const endereco = ref(dataTabUpdate._rawValue.items[0].endereco)
const cargo = ref(dataTabUpdate._rawValue.items[0].cargo)
const salario = ref(dataTabUpdate._rawValue.items[0].salario)
const admissao = ref(dataTabUpdate._rawValue.items[0].admissao)

const nomeError = computed(() => nome.value === '' || nome.value.length < 10)
const maeError = computed(() => mae.value === '' || mae.value.length < 10)
const paiError = computed(() => pai.value === '' || pai.value.length < 10)
const rgError = computed(() => rg.value === '' || rg.value.length < 9)
const cpfError = computed(() => cpf.value === '' || cpf.value.length < 11)
const emailError = computed(() => emailRegex.test(email.value) || email.value === '' || email.value.length < 5)
const telefoneError = computed(() => telefone.value === '' || telefone.value.length < 8)
const enderecoError = computed(() => endereco.value === '' || endereco.value.length < 10)
const cargoError = computed(() => cargo.value === '')
const salarioError = computed(() => salario.value === '' || salario.value === 0)

const submitForm = () => {
    const updateURL = dataUpdate.DEFAULT_URL+route.params.id

    if (nomeError.value || maeError.value || paiError.value || rgError.value 
    || cpfError.value || emailError.value || telefoneError.value || enderecoError.value 
    || cargoError.value || salarioError.value) {

        alertColor.value = 'bg-red-500'
        alertTitle.value = 'Erro ao preencher Formulário!'
        alertMsg.value = 'Observe os campos em vermelho e preencha corretamente!'
        person_modal.showModal()
        
    } else {
        const dados = {'nome':nome.value, 'sexo':sexo.value, 'nascimento':nascimento.value, 'mae':mae.value, 'pai':pai.value,
        'rg':rg.value, 'cpf':cpf.value, 'email':email.value, 'telefone':telefone.value, 'endereco':endereco.value,
        'cargo':cargo.value, 'salario':salario.value, 'admissao':admissao.value
        }

        const requestOptions = {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user_token.value.token} `
            },
            body:JSON.stringify(dados),
        }

        fetch(updateURL, requestOptions)
        .then(response => {
            if(!response.ok) {
                console.log('Erro ao fazer requisição: '+response.status)
            }
            return response.json()
        })
        .then(data => {
            alertColor.value = "bg-green-600"
            alertTitle.value = "Atualizado!"
            alertMsg.value = "As informações foram alteradas corretamente!"
            person_modal.showModal()
        })
        .catch(error => {
            console.log('Erro: ',error)
        })
        
    }
}
</script>

<template>
    <ModalPersonUpdate :sendAlertColor="alertColor" :sendAlertTitle="alertTitle" :sendAlertMsg="alertMsg"/>
    
    <form @submit.prevent="submitForm">
        <div class="flex flex-col gap-2 mt-4 form-control">

            <div class="divider text-slate-400">Colaborador</div>

            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm">
                        <span>Nome</span>
                        <input type="text" v-model="nome" class="input input-bordered sm:input-sm w-full" 
                            :class="{ 'border-red-400 bg-red-800': nomeError }" required/>
                    </div>
                    <div v-if="nomeError" class="text-red-300 text-xs">Nome não pode ter menos que 10 caracteres</div>
                </div>
    
                <select v-model="sexo" class="select sm:select-sm sm:w-72" w-full required>
                    <option disabled selected>Sexo</option>
                    <option >Masculino</option>
                    <option >Feminino</option>
                </select>
                
                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm">
                        <span>Nascimento</span>
                        <input type="date" v-model="nascimento" class="input input-bordered sm:input-sm sm:w-44 w-full"/>
                    </div>
                </div>
            </div>

            <div class="divider text-slate-400">Parentesco</div>                        

            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm py-1">
                        <span>Mãe</span>
                        <input type="text" v-model="mae" class="input input-bordered sm:input-sm w-full" 
                        :class="{ 'border-red-400 bg-red-800': maeError }" required/>
                    </div>
                    <div v-if="maeError" class="text-red-300 text-xs">Mãe não pode ser vazio, use Ausente ou Falecida se necessário</div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm py-1">
                        <span>Pai</span>
                        <input type="text" v-model="pai" class="input input-bordered sm:input-sm w-full" 
                        :class="{ 'border-red-400 bg-red-800': paiError }" required/>
                    </div>
                    <div v-if="paiError" class="text-red-300 text-xs">Pai não pode ser vazio, use Ausente ou Falecido se necessário</div>
                </div>
            </div>

            <div class="divider text-slate-400">Documentação e Contatos</div>                        

            <div class="flex flex-col gap-4">
                
                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex flex-col w-full">
                        <div class="input-group input-group-sm py-1">
                            <span>RG</span>
                            <input type="text" v-model="rg" class="input input-bordered sm:input-sm w-full sm:w-1/2" maxlength="9" 
                            :class="{ 'border-red-400 bg-red-800': rgError }" required/>
                        </div>
                        <div v-if="rgError" class="text-red-300 text-xs">RG não pode ser vazio, e não pode ter menos que 9 dígitos.</div>
                    </div>
                    <div class="flex flex-col w-full">
                        <div class="input-group input-group-sm py-1">
                            <span>CPF</span>
                            <input type="text" v-model="cpf" class="input input-bordered sm:input-sm w-full sm:w-1/2" maxlength="11" 
                            :class="{ 'border-red-400 bg-red-800': cpfError }" required/>
                        </div>
                        <div v-if="cpfError" class="text-red-300 text-xs">CPF não pode ser vazio, e não pode ter menos que 11 dígitos.</div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4">
                    <div class="flex flex-col w-full">
                        <div class="input-group input-group-sm py-1">
                            <span>Email</span>
                            <input type="email" v-model="email" class="input input-bordered sm:input-sm w-full sm:w-1/2" 
                            :class="{ 'border-red-400 bg-red-800': emailError }" required autocomplete="email"/>
                        </div>
                        <div v-if="emailError" class="text-red-300 text-xs">E-Mail não pode ser vazio, ou formato inválido.</div>                        
                    </div>

                    <div class="flex flex-col w-full">
                        <div class="input-group input-group-sm py-1">
                            <span>Telefone</span>
                            <input type="tel" v-model="telefone" class="input input-bordered sm:input-sm w-full sm:w-1/2" maxlength="9"
                            :class="{ 'border-red-400 bg-red-800': telefoneError }" required/>
                        </div>
                        <div v-if="telefoneError" class="text-red-300 text-xs">Telefone não pode ter menos que 8 dígitos.</div>
                    </div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm py-1">
                        <span>Endereço</span>
                        <input type="text" v-model="endereco" class="input input-bordered sm:input-sm w-full"
                        :class="{ 'border-red-400 bg-red-800': enderecoError }" required/>
                    </div>
                    <div v-if="enderecoError" class="text-red-300 text-xs">Endereço não pode ser vazio.</div>
                </div>
            </div>

            <div class="divider text-slate-400">Função</div>

            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm py-1">
                        <span>Cargo</span>
                        <input type="text" v-model="cargo" class="input input-bordered sm:input-sm w-full" 
                        :class="{ 'border-red-400 bg-red-800': cargoError }" required/>
                    </div>
                    <div v-if="cargoError" class="text-red-300 text-xs">Cargo não pode ser vazio.</div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm py-1">
                        <span>Salário</span>
                        <input type="number" step=".01" v-model="salario" class="input input-bordered sm:input-sm w-full" 
                        :class="{ 'border-red-400 bg-red-800': salarioError }" min="1" required/>
                    </div>
                    <div v-if="salarioError" class="text-red-300 text-xs">Salário não pode ser vazio ou zero.</div>
                </div>

                <div class="flex flex-col w-full">
                    <div class="input-group input-group-sm py-1">
                        <span>Admissão</span>
                        <input type="date" v-model="admissao" class="input input-bordered sm:input-sm sm:w-44 w-full" required/>
                    </div>
                </div>
            </div>

        </div>

        <div class="flex justify-center my-8">
            <button class="btn btn-success sm:w-1/4 w-full" type="submit">Enviar</button>
        </div>
    </form>
</template>
