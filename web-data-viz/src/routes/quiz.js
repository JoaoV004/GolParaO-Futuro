var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de quizController.js
router.post("/cadastrar", function (req, res) {
    quizController.cadastrar(req, res);
})
router.get("/exibirGraficoLiga", function (req, res) {
    quizController.exibirGraficoLiga(req, res);
})
router.get("/exibirGraficoTime", function (req, res) {
    quizController.exibirGraficoTime(req, res);
})

// router.get("/exibirLigaMaisAssistida", function (req, res) {
//     quizController.exibirLigaMaisAssistida(req, res);
// })






module.exports = router;