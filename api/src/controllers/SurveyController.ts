import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";


class SurveyController {
    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description,
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey); // o status 201 é exibido quando criamos algo, ou seja, é um status de create.
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find(); //lista todas as pesquisar e guardar na variável all.

        return response.json(all);
    }
}

export { SurveyController };
