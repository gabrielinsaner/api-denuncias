// index.js (API no Render)
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const BOT_WEBHOOK_URL = 'https://SEU_BOT_DISCLOUD/webhook-denuncia'; // coloque aqui o link real do bot

app.post('/denuncia', async (req, res) => {
  try {
    const denuncia = req.body;

    console.log("📥 Denúncia recebida:", denuncia);

    await axios.post(BOT_WEBHOOK_URL, denuncia);

    res.status(200).json({ status: 'Denúncia enviada ao bot com sucesso' });
  } catch (error) {
    console.error('Erro ao enviar denúncia:', error.message);
    res.status(500).json({ error: 'Erro ao enviar denúncia ao bot' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ API de denúncias rodando na porta ${PORT}`);
});
