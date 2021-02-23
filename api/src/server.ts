import express from "express";

const app = express();

/** Métodos HTTP -> mais comuns.
 * GET -> Busca
 * POST -> Salvar
 * PUT -> Alterar
 * DELETE -> Deletar
 * PATCH -> Alteração específica
*/

// http://localhost:3333/ -> URI de acesso no presente caso.

app.get("/", (request, response) => {
    return response.json({ message: "Hello World - NLW04" });
});

/** Parâmetros dos métodos HTTP
 * 1° parâmetro: Rota (Recurso da API)
 * 2° parâmetro: request (requisição),response (resposta)
*/
app.post('/', (request, response) => {
    // Recebeu os dados para salvar
    return response.json({ message: "Os dados foram gravados com sucesso!" });
});

app.listen(3333, () => console.log("Server is running!"));
