import 'reflect-metadata' // o reflect-metadata tem de ser a primeria importação.
import express from "express";
import createConnection from "./database"; // por padrão a aplicação já reconhece que, se dentro de database existir um arquivo nomeado de index, é este que ela executará. 
import { router } from './routes';

createConnection();
const app = express();

app.use(express.json()); // informa ao express que utilizaremos json nos requests do arquivo de rotas, isso é necessário pois o express não converte apenas para json, logo, temos de especificar o tipo de conversão desejado.
app.use(router); // o use, nesse caso, faz um papel parecido com o de um middleware.

export { app };
