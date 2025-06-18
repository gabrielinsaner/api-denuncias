// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

const WEBHOOK_URL = "https://discord.com/api/webhooks/1384791702375763978/4-aS11Xv5ZaTMxztqH5xMXXTHFBVMJQ1xefYGPz7ISCtMssCold4KCMHSY-pxhecAoUe";

app.use(cors());
app.use(bodyParser.json());

app.post("/denuncia", async (req, res) => {
  try {
    const dados = req.body;
    console.log("\uD83D\uDCE5 Den\u00fancia recebida:", dados);

    const embed = {
      title: "\u2709\uFE0F Nova Den\u00fancia Recebida",
      color: 16711680,
      fields: [
        { name: "\uD83D\uDC64 Nome do denunciante", value: dados.anonimo ? "Anonimo" : dados.nome, inline: true },
        { name: "\uD83C\uDD94 ID", value: dados.anonimo ? "Anonimo" : dados.id, inline: true },
        { name: "\uD83D\uDC6E\u200D\u2642\uFE0F Policial Denunciado", value: dados.policial },
        { name: "\uD83D\uDCC5 Data e Hora do Ocorrido", value: dados.dataHora },
        { name: "\u26A1 Tipo de Ocorr\u00eancia", value: dados.tipo },
        { name: "\u270D\uFE0F Descri\u00e7\u00e3o", value: dados.descricao },
        { name: "\uD83D\uDCCB Protocolo", value: dados.protocolo },
      ]
    };

    if (dados.arquivo) {
      embed.image = { url: dados.arquivo };
    }

    await axios.post(WEBHOOK_URL, {
      username: "Sistema de Den\u00fancias",
      embeds: [embed]
    });

    return res.status(200).json({ mensagem: "Den\u00fancia enviada com sucesso!" });
  } catch (erro) {
    console.error("\u274C Erro ao enviar den\u00fancia:", erro.message);
    return res.status(400).json({ erro: "Erro ao enviar den\u00fancia." });
  }
});

app.listen(PORT, () => {
  console.log(`\u2705 API de den\u00fancias rodando na porta ${PORT}`);
});
