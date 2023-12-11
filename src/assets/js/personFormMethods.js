export function validName(value) {
    const name_value = value.length
    if(name_value < 5) {
        alert('O campo Nome não pode ter menos que 6 caracteres!')
    }
}

export function validMotherName(value) {
    const name_value = value.length
    if(name_value < 5) {
        alert('O campo Mãe não pode ter menos que 6 caracteres!')
    }
}

export function validFatherName(value) {
    const name_value = value.length
    if(name_value < 5) {
        alert('O campo Pai não pode ter menos que 6 caracteres!')
    }
}

export function validAddress(value) {
    const name_value = value.length
    if(name_value < 5) {
        alert('O campo Endereço não pode ter menos que 6 caracteres!')
    }
}

export function validRG(value) {
    const rg_value = value.length

    if(rg_value < 9) {
        alert('RG não pode ter menos que 9 dígitos')
    }
}

export function validCPF(value) {
    const cpf_value = value

    if(cpf_value.length < 11) {
        alert('CPF não pode ter menos que 11 dígitos')
    }else if(isNaN(cpf_value)) {
        alert('CPF só pode conter dígitos de 0-9')
    }
}