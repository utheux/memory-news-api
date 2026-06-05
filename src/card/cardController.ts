import { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../errors/notFoundError";
import CardService from "./cardService";
import { CreateCardDTO } from "./dtos/createCardDTO";

export class CardController {
    constructor(private readonly cardService: CardService) { }

    private handleError(error: unknown, reply: FastifyReply) {
        if (error instanceof NotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        return reply.status(500).send({ message: "Erro interno do servidor" });
    }

    async createCard(
        request: FastifyRequest<{ Body: CreateCardDTO }>,
        reply: FastifyReply
    ) {
        try {
            const card = await this.cardService.createCard(request.body, request.session.userId!);

            reply.status(201).send(card);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const cards = await this.cardService.findAll(request.session.userId!);

            reply.status(200).send(cards);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async findById(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const card = await this.cardService.findById(request.params.id, request.session.userId!);

            reply.status(200).send(card);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async getCardsToReview(request: FastifyRequest, reply: FastifyReply) {
        try {
            const cards = await this.cardService.getCardsToReview(request.session.userId!);

            reply.status(200).send(cards);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async reviewCard(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const card = await this.cardService.reviewCard(request.params.id, request.session.userId!);

            reply.status(200).send(card);
        } catch (error) {
            this.handleError(error, reply);
        }
    }

    async deleteCard(
        request: FastifyRequest<{ Params: { id: string } }>,
        reply: FastifyReply
    ) {
        try {
            await this.cardService.deleteCard(request.params.id, request.session.userId!);

            reply.status(204).send();
        } catch (error) {
            this.handleError(error, reply);
        }
    }
}

export default CardController;
