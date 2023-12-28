<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const noView = ref(false)
const changeView = () => { noView.value = !noView.value}
const no_server = ref(false)
const has_user = ref(true)
const expired_token = ref(false)
const have_not_token = ref(false)

const dados = ref({
    username:'',
    password:'',
})


const validateNotExpiredToken = (dateString) => {
  const dateNow = new Date().toISOString()

  const year = dateNow.substring(0,4)
  const month = dateNow.substring(5,7)
  const day = dateNow.substring(8,10)
  const dateInform = `${year}-${month}-${day}`

  return dateInform === dateString
}

const sendDataRequest = () => {
    const requestBody = {
        username:dados.value.username,
        password:dados.value.password,
    }

    // *LEMBRAR: Mover todo esse código fetch para o Pínia futuramente.
    fetch('https://devfabiopedro.pythonanywhere.com/account/api/v1/logon/', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type':'application/json',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        // Se Chegou até aqui, o servidor remoto está respondendo normalmente.
        no_server.value = false

        // Eu limpo os campos do formulários de dados para cada nova tentativa de login.
        dados.value.username = ''
        dados.value.password = ''
       
        /*
            Se na tentativa de autenticação no servidor remoto, vier na 
            resposta um campo 'firstname' é porque os dados de usuário foram
            autenticados lá no backend, então as informações dele estão sendo 
            corretamente retornadas nessa resposta.
       */ 
        if('first_name' in data) {
            const valid_token = validateNotExpiredToken(data.created_at)
            expired_token.value = false

            /*
                Se o usuário já está autenticado no backend, será verificado 
                aqui a validade do token de acesso que ele tem e com duração de 1 dia.
                (É uma convenção deste projeto a validade do token de apenas 1 dia)
                A validação é feita comparando se a data em que o token foi gerado é
                igual com a data atual.
                ex: 01/01/2023 deve ser igual a 01/01/2023.
            */
            if(valid_token) {
                const userDataInfo = {
                    'logged':data.first_name,
                    'token':data.access_token
                }
                const userDataInfoJson = JSON.stringify(userDataInfo)
                localStorage.setItem("userdata",userDataInfoJson)
                // Se o token é válido, faz a navegação automática até a próxima página.
                router.push('/container')
            } else { // Se estiver expirado, permanece na mesma página e será apresentado uma mensagem de aviso.
                expired_token.value = true
            }
        /*
            Um caso específico que acontece é: O usuário é registrado lá no backend, mas ele
            ainda não gerou um token para ter acesso, portanto ele não pode acessar o sistema.
            Ao fazer o login, ele receberá uma mensagem de aviso sobre isso.
        */
        } else if(data['detail'] === '202') {
            have_not_token.value = true

        } else { // Mensagem de erro para os casos de credencial inválida.
            has_user.value = false
        }
    })
    .catch((error) => { // Mensagem de aviso para o caso de servidor fora do ar, ou inacessível.
        console.log(error)
        no_server.value = true
    })
}
</script>

<template>
    <div>
        <main>
            <div class="min-h-screen flex flex-col sm:flex-row">
                <div class="flex-1 bg-[url('/src/assets/images/building.jpg')] bg-cover sm:bg-none 
                text-center sm:text-left text-black text-2xl sm:text-sm">
                    <p class="text-slate-500 text-4xl text-center text-transparent
                    bg-clip-text mt-[10%] font-black bg-gradient-to-r from-indigo-600 via-gray-100 to-indigo-900 
                    uppercase">funcionários</p>
                    <div class="flex flex-col justify-center items-center mt-5">
                        <div class="card sm:w-96 pb-12">
                            <span class="ml-5">Login</span>
                            <form @submit.prevent="sendDataRequest">
                                <span class="flex flex-col m-5 gap-5">
                                    <input type="text" placeholder="Usuário" v-model="dados.username" class="input sm:input-sm input-bordered w-full max-w-xs"/>
                                    <div class="flex flex-row items-center">
                                        <input :type="noView ? 'text' : 'password'" placeholder="Senha" v-model="dados.password"
                                        class="input sm:input-sm input-bordered w-full"/>
                                        <i class="px-1 btn btn-ghost fa-solid fa-eye" @click="changeView" v-if="!noView"></i>
                                        <i class="px-1 btn btn-ghost fa-solid fa-eye-slash" @click="changeView" v-else></i>
                                    </div>
                                </span>
                                <div class="flex justify-center mt-16">
                                    <button type="submit" class="btn sm:btn-sm btn-primary">Logon</button>
                                </div>
                            </form>
                            
                            <!-- mensagens ao usuário -->
                            <div v-if="no_server" class="flex alert alert-warning mt-10 self-center justify-center shadow-lg w-[95%]">
                                <i class="fa-solid fa-triangle-exclamation text-lg"></i>
                                <span>Alerta: Sem conexão com servidor!</span>
                            </div>

                            <div v-if="!has_user" class="flex alert alert-error mt-10 self-center justify-center shadow-lg w-[95%]">
                                <i class="fa-solid fa-triangle-exclamation text-lg"></i>
                                <span>Erro: Credenciais inválidas!</span>
                            </div>

                            <div v-if="expired_token" class="flex alert alert-info mt-10 self-center justify-center shadow-lg w-[95%]">
                                <i class="fa-solid fa-circle-info text-lg"></i>
                                <span>Info: Seu token expirou, gere um novo token!</span>
                            </div>

                            <div v-if="have_not_token" class="flex alert alert-warning mt-10 self-center justify-center shadow-lg w-[95%]">
                                <i class="fa-solid fa-circle-info text-lg"></i>
                                <span>Info: Você ainda não criou seu token de acesso!</span>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="hidden sm:block sm:flex-1 bg-[url('/src/assets/images/building.jpg')] bg-cover bg-no-repeat text-center"></div>
            </div>
        </main>
    </div>
</template>

