const express = require("express");
const logger = require("./loggerConfig");
const app = express();

app.use(express.json());

app.post("/teste", (req, res) => {
  const { email, senha } = req.body;
  console.log("email: ", email);
  console.log("senha: ", senha);
  if (!email && !senha) {
    logger.error("Nenhum campo informado");
    res.status(400).send("Nenhum campo informado");
  } else if (!email || !senha) {
    logger.warn("Um dos campos não foi informado");
    res.status(400).send("Um dos campos não foi informado");
  } else {
    logger.info("Requisição realizada com sucesso");
    res.status(200).send("Olá Mundo!");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
