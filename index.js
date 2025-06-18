// index.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 10000;

// Webhooks separados (se quiser usar canais diferentes futuramente)
const WEBHOOK_NORMAL = "https://discord.com/api/webhooks/1384791702375763978/4-aS11Xv5ZaTMxztqH5xMXXTHFBVMJQ1xefYGPz7ISCtMssCold4KCMHSY-pxhecAoUe";
const WEBHOOK_INTERNA = "https://discord.com/api/webhooks/1384872077982564433/uP_ovqDeZMUNB82Cbe8YtNCpRivwp3csPJX5M1u5HOxEEXf_uVkLCOjo0Osyvs7Yfi4U"; // Canal de denúncia interna

app.use(cors());
app.use(bodyParser.json());

app.post("/denuncia", async (req, res) => {
  try {
    const dados = req.body;
    console.log("📥 Denúncia recebida:", dados);

    let embed = {};
    let webhookUrl = WEBHOOK_NORMAL;

    if (dados.tipo === "interna") {
      // Denúncia interna (com dados do acusado)
      webhookUrl = WEBHOOK_INTERNA;

      embed = {
        title: "📢 Nova Denúncia Interna Recebida",
        color: 16753920,
        fields: [
          { name: "👤 Nome do Denunciante", value: dados.denuncianteNome || "N/A", inline: true },
          { name: "🪪 RG", value: dados.denuncianteRG || "N/A", inline: true },
          { name: "🎖️ Patente", value: dados.denunciantePatente || "N/A", inline: true },
          { name: "🚔 Divisão", value: dados.denuncianteDivisao || "N/A", inline: true },
          { name: "🧍 Nome do Acusado", value: dados.acusadoNome || "N/A", inline: true },
          { name: "🪪 RG do Acusado", value: dados.acusadoRG || "N/A", inline: true },
          { name: "🎖️ Patente do Acusado", value: dados.acusadoPatente || "N/A", inline: true },
          { name: "🚓 Divisão do Acusado", value: dados.acusadoDivisao || "N/A", inline: true },
          { name: "📝 Descrição", value: dados.descricao || "N/A" },
          { name: "📅 Data/Hora", value: dados.dataHora || "N/A", inline: true },
          { name: "📄 Protocolo", value: dados.protocolo || "N/A", inline: true }
        ]
      };

    } else {
      // Denúncia comum
      embed = {
        title: "📩 Nova Denúncia Recebida",
        color: 16711680,
        fields: [
          { name: "👤 Nome do Denunciante", value: dados.anonimo ? "Anônimo" : dados.nome, inline: true },
          { name: "🆔 ID", value: dados.anonimo ? "Anônimo" : dados.id, inline: true },
          { name: "👮 Policial Denunciado", value: dados.policial || "N/A" },
          { name: "📅 Data e Hora", value: dados.dataHora || "N/A" },
          { name: "⚡ Tipo de Ocorrência", value: dados.tipo || "N/A" },
          { name: "📝 Descrição", value: dados.descricao || "N/A" },
          { name: "📄 Protocolo", value: dados.protocolo || "N/A" }
        ]
      };
    }

    if (dados.arquivo) {
      embed.image = { url: dados.arquivo };
    }

    await axios.post(webhookUrl, {
      username: "Sistema de Denúncias",
      embeds: [embed]
    });

    return res.status(200).json({ mensagem: "✅ Denúncia enviada com sucesso!" });
  } catch (erro) {
    console.error("❌ Erro ao enviar denúncia:", erro.message);
    return res.status(400).json({ erro: "Erro ao enviar denúncia." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ API de denúncias rodando na porta ${PORT}`);
});
