document.addEventListener('DOMContentLoaded', function() {
    const pressaoArterial = document.getElementById('pressaoArterial');
    pressaoArterial.selectedIndex = -1; // Define o índice de seleção como nenhum
});

// Função para monitorar os sinais vitais
function monitorarSinais() {
    console.log('Clicou no botão Monitorar');

    const formulario = document.getElementById('formulario');
    const alerta = document.getElementById('alerta');

    // Verificar se todos os campos foram preenchidos corretamente
    const campos = Array.from(formulario.elements).slice(0, -1);
    const camposVazios = campos.filter(element => {
        return element.type !== 'submit' &&
               (element.value.trim() === '' || !element.checkValidity());
    });

    // Adicionar verificação visual para campos numéricos (como temperatura)
    const camposNumericosVazios = campos.filter(element => {
        return element.type === 'number' &&
               element.value.trim() === '' &&
               !element.checkValidity();
    });

    if (camposVazios.length > 0 || camposNumericosVazios.length > 0) {
        alerta.textContent = 'Por favor, preencha todos os campos do formulário.';
        alerta.style.backgroundColor = '#f44336';
        alerta.style.display = 'block';
        console.log('Alerta exibido: Por favor, preencha todos os campos do formulário.');
        return;
    }

    // Se todos os campos são válidos, construa o objeto de dados
    const dadosUsuario = {
        nome: formulario.nome.value,
        batimentosCardiacos: formulario.batimentosCardiacos.value,
        pressaoArterial: formulario.pressaoArterial.value,
        temperatura: formulario.temperatura.value
    };

    // Envia uma solicitação POST para a API
    fetch('http://localhost:3333/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosUsuario),
    })
    .then(response => response.json())
    .then(data => {
        // Manipula a resposta da API (pode exibir uma mensagem de sucesso, etc.)
        console.log(data);
        alerta.textContent = 'Os profissionais de saúde responsáveis foram notificados!';
        alerta.style.backgroundColor = '#0e8066';
        alerta.style.display = 'block';
        const audioNotificacao = document.getElementById('audioNotificacao');
        audioNotificacao.play();
        atualizarCorBotao();
    })
    .catch(error => {
        // Manipula erros durante a solicitação
        console.error('Erro durante a solicitação:', error);
        alerta.textContent = 'Erro durante a solicitação. Por favor, tente novamente.';
        alerta.style.backgroundColor = '#f44336';
        alerta.style.display = 'block';
    });
}
// Remover a seleção prévia da opção "alta" no carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    const pressaoArterial = document.getElementById('pressaoArterial');
    pressaoArterial.selectedIndex = -1; // Define o índice de seleção como nenhum
});

// Adicionar validação ao campo de batimentos cardíacos
const batimentosCardiacosInput = document.getElementById('batimentosCardiacos');

batimentosCardiacosInput.addEventListener('input', function() {
    const valor = this.value.trim();
    const valido = /^\d+$/.test(valor); // Verifica se o valor é um número

    if (valido) {
        this.classList.remove('campo-invalido');
    } else {
        this.classList.add('campo-invalido');
    }

    // Alterar a cor de fundo do botão Monitorar
    atualizarCorBotao();
});

// Adicionar validação ao campo de temperatura
const temperaturaInput = document.getElementById('temperatura');

temperaturaInput.addEventListener('input', function() {
    const valor = parseFloat(this.value.replace(',', '.')); // Substituir ',' por '.' para permitir decimais
    const valido = !isNaN(valor) && valor >= 30 && valor <= 45;

    if (valido || this.value.trim() === '') {
        this.classList.remove('campo-invalido');
    } else {
        this.classList.add('campo-invalido');
    }

    // Alterar a cor de fundo do botão Monitorar
    atualizarCorBotao();
});

// Função para atualizar a cor do botão Monitorar
function atualizarCorBotao() {
    const botaoMonitorar = document.querySelector('button');
    const camposInvalidos = document.querySelectorAll('.campo-invalido');

    botaoMonitorar.style.backgroundColor = camposInvalidos.length === 0 ? '#0e8066' : '#ccc'; // Cinza se houver campos inválidos
    botaoMonitorar.disabled = camposInvalidos.length > 0;
}

