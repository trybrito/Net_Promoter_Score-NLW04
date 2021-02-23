import 'reflect-metadata' // o reflect-metadata tem de ser a primeria importação.
import express from "express";
import "./database"; // por padrão a aplicação já reconhece que, se dentro de database existir um arquivo nomeado de index, é este que ela executará. 
import { router } from './routes';

const app = express();

app.use(express.json()); // informa ao express que utilizaremos json nos requests do arquivo de rotas.
app.use(router); // o use, nesse caso, faz um papel parecido com o de um middleware.

app.listen(3333, () => console.log("Server is running!"));
