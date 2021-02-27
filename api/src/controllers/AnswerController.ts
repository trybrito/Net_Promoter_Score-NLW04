import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerConstroller {

    // http://localhost:3333/answers/10?u=a2734504-03f3-4ea3-be59-ba775a7021eb
    //routes.get("/answers/:value/:nota/:product") -> routes params.

    /** Parâmetros da URL
     * Body params -> são os tipos de parâmetros que já vinhamos utilizando no request.body;
     * Route params -> parâmetros que compõem a rota, como o valor da nota e o recurso 'answers' na URL acima; 
     * Query params -> parâmetros não obrigatórios utilizados, por exemplo, em buscas e paginações. Uma query param sempre virá depois de uma '?' e opera com chave-valor.
    */

    async execute(request: Request, response: Response) {
        const { value } = request.params; // recebemos o valor em String.
        const { u } = request.query; // recebemos o valor em formato Undefined.

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.status(200).json(surveyUser);

    };
}

export { AnswerConstroller };
