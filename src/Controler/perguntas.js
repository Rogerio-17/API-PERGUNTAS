import { openDb } from "../configDB.js";

export default async function createTable() {
  openDb()
    .then((db) => {
      db.exec(
        "CREATE TABLE IF NOT EXISTS perguntas (id INTEGER PRIMARY KEY , answersA TEXT, answersB TEXT, answersC TEXT, answersD TEXT, correct TEXT)"
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function InsertPergunta(perguntas) {
  console.log(perguntas);
  openDb()
    .then((db) => {
      db.run(
        "INSERT INTO perguntas ( answersA, answersB, answersC, answersD, correct) VALUES (?,?,?,?,?)",
        [
          perguntas.answersA,
          perguntas.answersB,
          perguntas.answersC,
          perguntas.answersD,
          perguntas.correct,
        ]
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updatePergunta(perguntas) {
  openDb()
    .then((db) => {
      db.run(
        "UPDATE perguntas SET answersA=?, answersB=?, answersC=?, answersD=?, correct=? WHERE id=?",
        [
          perguntas.answersA,
          perguntas.answersB,
          perguntas.answersC,
          perguntas.answersD,
          perguntas.correct,
          perguntas.id,
        ]
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function selectPergunta() {
  return openDb().then((db) => {
    return db.all("SELECT * FROM perguntas").then((res) => res);
  });
}
