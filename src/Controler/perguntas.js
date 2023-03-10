import { openDb } from "../configDB.js";

export default async function createTable() {
  openDb()
    .then((db) => {
      db.exec(
        "CREATE TABLE IF NOT EXISTS question (id INTEGER PRIMARY KEY , question TEXT, answersA TEXT, answersB TEXT, answersC TEXT, answersD TEXT, correct TEXT)"
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

// GET - PERGUNTAS
export async function selectPerguntas(req, res) {
  openDb().then((db) => {
    db.all("SELECT * FROM question").then((perguntas) => res.json(perguntas));
  });
}

// GET - PERGUNTA UNICA
export async function selectPergunta(req, res) {
  let id = req.body.id;

  openDb().then((db) => {
    db.get("SELECT * FROM question WHERE id=?", [id]).then((pergunta) => {
      // Verifica se a pergunta existe no BD
      if (pergunta != undefined) {
        res.json(pergunta);
      } else {
        res.json({
          msg: "Pergunta não encontrada",
        });
      }
    });
  });
}

// POST - PERGUNTA
export async function InsertPergunta(req, res) {
  let perguntas = req.body;
  openDb()
    .then((db) => {
      db.run(
        "INSERT INTO question ( question, answersA, answersB, answersC, answersD, correct) VALUES (?,?,?,?,?,?)",
        [
          perguntas.question,
          perguntas.answersA,
          perguntas.answersB,
          perguntas.answersC,
          perguntas.answersD,
          perguntas.correct,
        ]
      );

      res.json({
        statusCode: "200",
        msg: "dados salvos com sucessso",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

// PUT - Atualiza pergunta
export async function updatePergunta(req, res) {
  let perguntas = req.body;
  openDb()
    .then((db) => {
      if (perguntas && !perguntas.id) {
        res.json({
          statusCode: "400",
          msg: "Você precisar informa um ID válido",
        });
      } else {
        db.run(
          "UPDATE question SET question=? answersA=?, answersB=?, answersC=?, answersD=?, correct=? WHERE id=?",
          [
            perguntas.question,
            perguntas.answersA,
            perguntas.answersB,
            perguntas.answersC,
            perguntas.answersD,
            perguntas.correct,
            perguntas.id,
          ]
        );
        res.json({
          msg: "Dados atualizados com sucesso",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

//DELETE - Deleta pergunta
export async function deletePergunta(req, res) {
  let id = req.body.id;
  openDb().then((db) => {
    if (!id) {
      res.json({
        msg: "É preciso repassar um ID",
      });
    }
    db.get("DELETE FROM question WHERE id=?", [id]).then(() =>
      res.json({
        msg: "pergunta deletada com sucesso",
      })
    );
  });
}
