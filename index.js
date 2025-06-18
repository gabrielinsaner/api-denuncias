const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// ATENÇÃO: Coloque aqui a URL pública do seu bot (ex: https://meu-bot.herokuapp.com/webhook-denuncia)
const BOT_WEBHOOK_URL = 'https://discord.com/api/webhooks/1384791702375763978/4-aS11Xv5ZaTMxztqH5xMXXTHFBVMJQ1xefYGPz7ISCtMssCold4KCMHSY-pxhecAoUe';

app.post('/denuncia', async (req, res) => {
  try {
    const denuncia = req.body;

    console.log("📥 Denúncia recebida:", denuncia);

    // Envia a denúncia para o bot via webhook
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
