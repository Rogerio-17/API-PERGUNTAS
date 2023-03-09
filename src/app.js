// Importa o banco de dados do arquivo de conf
// import { openDb } from "./configDB.js"
import createTable, {
  InsertPergunta,
  selectPergunta,
  updatePergunta,
} from "./Controler/perguntas.js";

// chamadas padrões do express
import express from "express";
const app = express();
app.use(express.json());

// porta que esta rodando o servidor
const port = 3000;

createTable();

// Rota padrao
app.get("/", (req, res) => {
  res.send("Hello Worlds");
});

// Busca informações
app.get("/perguntas", async (req, res) => {
  let perguntas = await selectPergunta();
  res.json(perguntas);
});

//rota de adicionar perguntas
app.post("/add/perguntas", (req, res) => {
  InsertPergunta(req.body);
  res.json({
    statusCode: "200",
  });
});

//rota para edição de perguntas
app.put("/edit/perguntas", (req, res) => {
  //Verifica se possui um ID
  if (req.body && !req.body.id) {
    res.json({
      statusCode: "400",
      msg: "Você precisa informa um id válido",
    });
  } else {
    updatePergunta(req.body);
    res.json({
      statusCode: "200",
    });
  }
});

//executando o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
