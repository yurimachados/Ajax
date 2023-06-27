const form = document.querySelector('#form')
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const cep = document.getElementById('cep')
const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const cidade = document.getElementById('cidade')
const uf = document.getElementById('uf')
const mensagem = document.querySelector('#mensagem')
const notNull = document.getElementsByClassName('not-null')

function isEmpty(elem) {
    return elem.value.length < 1 ? `O campo <strong>${elem.name}</strong> não pode ser vazio` : ``;
}

function validaEmail(elem) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(elem.value).toLowerCase()) ? '' : 'Digite um <strong>e-mail</strong> válido!'
}

function validaCEP(elem) {
    if (!elem.value.match(/^[0-9]{8}/)) {
        return 'Digite um <strong>CEP</strong> válido!'
    } else {
        return ''
    }
}

function updateAddress(data) {
    if (!("error" in data)) {
        rua.value = (data.logradouro)
        bairro.value = (data.bairro)
        cidade.value = (data.localidade)
        uf.value = (data.uf)
        mensagem.innerHTML = ''

    } else {
        mensagem.innerHTML = `CEP não encontrado`
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let msg = []
    let markup = ''

    Array.from(notNull).forEach(field => {
        let fieldState = isEmpty(field)
        fieldState.length > 1 ? msg.push(fieldState) : '';
    })

    const isEmail = validaEmail(email)
    if (isEmail) msg.push(isEmail)

    const isCEP = validaCEP(cep)
    if (isCEP == '') {
        const script = document.createElement('script')
        script.src = 'https://viacep.com.br/ws/' + cep.value + '/json?callback=updateAddress'
        document.body.appendChild(script)
    } else {
        msg.push(isCEP)
    }


    msg.forEach(item => {
        markup += `<p>${item}</p>`
    })
    
    mensagem.innerHTML = markup

    if(msg.length == 0) form.submit()
})