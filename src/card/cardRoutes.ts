import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middlewares/authMiddleware";
import CardController from "./cardController";
import CardService from "./cardService";
import { CreateCardDTO } from "./dtos/createCardDTO";

const cardService = new CardService();
const cardController = new CardController(cardService);

export const cardRoutes = async (app: FastifyInstance) => {
    app.post<{ Body: CreateCardDTO }>("/card", { preHandler: authMiddleware }, cardController.createCard.bind(cardController));
    app.get("/card", { preHandler: authMiddleware }, cardController.findAll.bind(cardController));
    app.get("/card/review", { preHandler: authMiddleware }, cardController.getCardsToReview.bind(cardController));
    app.post<{ Params: { id: string } }>("/card/:id/review", { preHandler: authMiddleware }, cardController.reviewCard.bind(cardController));
    app.get<{ Params: { id: string } }>("/card/:id", { preHandler: authMiddleware }, cardController.findById.bind(cardController));
    app.delete<{ Params: { id: string } }>("/card/:id", { preHandler: authMiddleware }, cardController.deleteCard.bind(cardController));
};
