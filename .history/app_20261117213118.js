require('dotenv').config()
const express = require('express');
const ensaioRoutes = require('./routes/ensaioRoutes');
const equipamentoRoutes = require('./routes/equipamentoRoutes');
const analistaRoutes = require('./routes/analistaRoutes');

const app = express();

app.use(express.json());
app.use('/ensaio', ensaioRoutes);
app.use('/equipamento', equipamentoRoutes);
app.use('/analista', analistaRoutes);

app.use((req, res) => {
  res.status(404).json({ mensagem: 'Rota não encontrada.' });
});

app.use((error, req, res, next) => {
  console.error('Erro não tratado na aplicação:', error);
  const status = Number.isInteger(error.status) && error.status >= 400 && error.status < 500
    ? error.status
    : 500;
  return res.status(status).json({ mensagem: status === 400 ? 'JSON inválido.' : 'Erro interno do servidor.' });
});

if (require.main === module) {
  const porta = Number(process.env.PORT || 3001);
  app.listen(porta, () => {
    console.log(`API de Laboratório de Ensaios rodando na porta ${porta}.`);
  });
}

module.exports = app;
