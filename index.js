const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// URL do webhook do bot (bot escutando esta rota)
const BOT_WEBHOOK_URL = 'https://url-do-seu-bot-no-discloud-ou-outra-plataforma/webhook-denuncia';

app.use(cors());
app.use(express.json());

app.post('/denuncia', async (req, res) => {
  try {
    const denuncia = req.body;

    if (!BOT_WEBHOOK_URL) {
      return res.status(500).json({ error: 'Webhook do bot não configurado' });
    }

    await axios.post(BOT_WEBHOOK_URL, denuncia);

    res.status(200).json({ status: 'Denúncia enviada ao bot' });
  } catch (error) {
    console.error('Erro ao enviar denúncia:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API de denúncias rodando na porta ${PORT}`);
});
