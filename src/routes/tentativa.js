var express = require("express");
var router = express.Router();

var tentativaController = require("../controllers/tentativaController");

router.post("/registrar", function (req, res) {
    tentativaController.registrar(req, res);
});

router.get("/resumo/:idUsuario", function (req, res) {
    tentativaController.resumo(req, res);
});

router.get("/historico/:idUsuario", function (req, res) {
    tentativaController.historico(req, res);
});

router.get("/ranking", function (req, res) {
    tentativaController.ranking(req, res);
});

module.exports = router;