var quizModel = require("../models/quizModel");



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo quiz.html
    var liga = req.body.ligaServer;
    var time = req.body.timeServer;
        
        
    // Faça as validações dos valores
    if (liga == undefined) {
        res.status(400).send("Sua liga está undefined!");
    } else if (time == undefined) {
        res.status(400).send("Seu time está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo quizModel.js
        quizModel.cadastrar(liga, time)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function exibirGraficoLiga(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.exibirGraficoLiga(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function exibirGraficoTime(req, res) {
    var idUsuario = req.params.idUsuario;

    quizModel.exibirGraficoTime(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

// function exibirLigaMaisAssistida(req, res) {
//     var idUsuario = req.params.idUsuario;

//     quizModel.exibirLigaMaisAssistida(idUsuario)
//         .then((resposta) => {
//             res.status(200).json(resposta);
//         });         
// }
// function exibirTimeMaisTorcido(req, res) {
//     var idUsuario = req.params.idUsuario;

//     quizModel.exibirTimeMaisTorcido(idUsuario)
//         .then((resposta) => {
//             res.status(200).json(resposta);
//         });         
// }

module.exports = {
    cadastrar,
    exibirGraficoLiga,
    exibirGraficoTime
    // exibirLigaMaisAssistida,
    // exibirTimeMaisTorcido
}