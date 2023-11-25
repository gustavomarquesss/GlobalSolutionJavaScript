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
