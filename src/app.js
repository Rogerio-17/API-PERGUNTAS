// Importa o banco de dados do arquivo de conf
import { openDb } from "./configDB.js";
import createTable from "./Controler/perguntas.js";
import fs from "fs";
import https from "https";
import cors from "cors";

// chamadas padrões do express
import express, { Router } from "express";
const app = express();
app.use(express.json());
app.use(cors());
//openDb();
//createTable();

// porta que esta rodando o servidor
const port = 3000;
import router from "./routes.js";
app.use(router);

//executando o servidor
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
