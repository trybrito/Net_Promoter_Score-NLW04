import 'reflect-metadata' // o reflect-metadata tem de ser a primeria importação.
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import createConnection from "./database"; // por padrão a aplicação já reconhece que, se dentro de database existir um arquivo nomeado de index, é este que ela executará. 
import { router } from './routes';
import { AppError } from './errors/AppError';

createConnection();
const app = express();

app.use(express.json()); // informa ao express que utilizaremos json nos requests do arquivo de rotas, isso é necessário pois o express não converte apenas para json, logo, temos de especificar o tipo de conversão desejado.
app.use(router); // o use, nesse caso, faz um papel parecido com o de um middleware.

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {

    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`,
    });
});

export { app };
