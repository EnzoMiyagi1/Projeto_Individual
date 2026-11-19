var database = require("../database/config");

function registrar(idUsuario, acertos, erros) {
    var instrucaoSql = `
        INSERT INTO tentativa (fk_usuario, acertos, erros)
        VALUES (${idUsuario}, ${acertos}, ${erros});
    `;
    return database.executar(instrucaoSql);
}

function resumo(idUsuario) {
    var instrucaoSql = `
        SELECT COALESCE(SUM(acertos), 0) AS acertos,
               COALESCE(SUM(erros), 0) AS erros,
               COUNT(*) AS tentativas,
               COALESCE(MAX(acertos), 0) AS melhor
        FROM tentativa
        WHERE fk_usuario = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function historico(idUsuario) {
    var instrucaoSql = `
        SELECT acertos, erros,
               DATE_FORMAT(dt_tentativa, '%d/%m %H:%i') AS momento_grafico
        FROM tentativa
        WHERE fk_usuario = ${idUsuario}
        ORDER BY id DESC
        LIMIT 7;
    `;
    return database.executar(instrucaoSql);
}

function ranking() {
    var instrucaoSql = `
        SELECT u.nomeCompleto,
               SUM(t.acertos) AS acertos,
               SUM(t.erros) AS erros,
               ROUND(100 * SUM(t.acertos) / NULLIF(SUM(t.acertos + t.erros), 0)) AS aproveitamento
        FROM tentativa t
        JOIN usuario u ON u.id = t.fk_usuario
        GROUP BY u.id, u.nomeCompleto
        ORDER BY acertos DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

function ultima(idUsuario){
    var instrucaoSql = `select id ,
                acertos,
               erros
            from tentativa where fk_usuario = ${idUsuario} order by id desc limit 1;`;
     return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    resumo,
    historico,
    ranking,
    ultima
};