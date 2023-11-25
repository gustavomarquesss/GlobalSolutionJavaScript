const express = require('express');
const cors = require('cors');
const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Ok!', message: 'API de saúde está funcionando corretamente' });
});

app.post('/api/error', (req, res, next) => {
    const error = new Error('Erro simulado durante a solicitação POST');
    error.status = 500;
    next(error);
});

app.post('/api/user', (req, res) => {
    const { nome, batimentosCardiacos, pressaoArterial, temperatura } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes e não estão vazios
    if (!nome || !batimentosCardiacos || !pressaoArterial || !temperatura) {
        const error = new Error('Todos os campos do formulário devem ser preenchidos.');
        error.status = 400; // Código de status "Bad Request"
        return next(error);
    }

    // Restante do código para processar os dados e enviar a resposta
    res.json({
        message: 'Dados do usuário recebidos com sucesso',
        nome,
        batimentosCardiacos,
        pressaoArterial,
        temperatura
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});
