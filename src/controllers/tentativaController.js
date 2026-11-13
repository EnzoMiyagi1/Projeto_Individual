var tentativaModel = require("../models/tentativaModel");

function registrar(req, res) {
    var idUsuario = Number(req.body.idUsuarioServer);
    var acertos = Number(req.body.acertosServer);
    var erros = Number(req.body.errosServer);

    if (!Number.isInteger(idUsuario) || idUsuario < 1) {
        res.status(400).send("Seu idUsuario está inválido!");
    } else if (!Number.isInteger(acertos) || acertos < 0) {
        res.status(400).send("Seus acertos estão inválidos!");
    } else if (!Number.isInteger(erros) || erros < 0) {
        res.status(400).send("Seus erros estão inválidos!");
    } else {
        tentativaModel.registrar(idUsuario, acertos, erros)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao registrar a tentativa! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function resumo(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario < 1) {
        res.status(400).send("O idUsuario está inválido!");
    } else {
        tentativaModel.resumo(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao buscar o resumo! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function historico(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (!Number.isInteger(idUsuario) || idUsuario < 1) {
        res.status(400).send("O idUsuario está inválido!");
    } else {
        tentativaModel.historico(idUsuario)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log("Houve um erro ao buscar o histórico! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function ranking(req, res) {
    tentativaModel.ranking()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log("Houve um erro ao buscar o ranking! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    resumo,
    historico,
    ranking
};