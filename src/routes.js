import { Router } from "express";
import createTable, {
  InsertPergunta,
  selectPergunta,
  updatePergunta,
  deletePergunta,
  selectPerguntas,
} from "./Controler/perguntas.js";

const router = Router();

//API para teste de codigo
router.get("/", (req, res) => {
  res.json({
    statusCode: "200",
    msg: "Requisição gerada com sucesso",
  });
});

// Pega todas as perguntas
router.get("/perguntas", selectPerguntas);

// Pega uma pergunta em especifica
router.get("/pergunta", selectPergunta);

// Insere pergunta
router.post("/add/perguntas", InsertPergunta);

// Edita pergunta
router.post("/edit/pergunta", updatePergunta);

// Deleta pergunta
router.delete("/delete/pergunta", deletePergunta);

export default router;
