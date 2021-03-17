import { Request, Response } from "express";
import { getCustomRepository, Not, IsNull } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NpsController {
    // cálculo do NPS: (número de promotores - número de detratores) / (número de votantes) * 100.

    async execute(request: Request, response: Response) {
        const { survey_id } = request.params;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull()),
        });

        const detractors = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6).length;
        const passives = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8).length;
        const promoters = surveysUsers.filter(
            (survey) => survey.value >= 9).length;

        const totalAnswers = surveysUsers.length;

        const calculate = Number(((promoters - detractors) / totalAnswers * 100).toFixed(2)); // fixamos que a variável 'calculate' terá apenas duas casa decimais.

        return response.json({
            detractors,
            passives,
            promoters,
            totalAnswers,
            nps: calculate,
        });
    }
}

export { NpsController };
