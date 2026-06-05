import { NotFoundError } from "../errors/notFoundError";
import Card from "./cardModel";
import { CreateCardDTO } from "./dtos/createCardDTO";

class CardService {
    async createCard(createCardDTO: CreateCardDTO, userId: string) {
        const card = await Card.create({ ...createCardDTO, userId });

        return card;
    }

    async findAll(userId: string) {
        const cards = await Card.find({ userId });

        return cards;
    }

    async findById(id: string, userId: string) {
        const card = await Card.findOne({ _id: id, userId });

        if (card === null) {
            throw new NotFoundError("Card não encontrado!");
        }

        return card;
    }

    async deleteCard(id: string, userId: string) {
        const card = await Card.findOneAndDelete({ _id: id, userId });

        if (card === null) {
            throw new NotFoundError("Card não encontrado!");
        }

        return card;
    }

    async getCardsToReview(userId: string) {
        const now = new Date();

        const pendingCards = await Card.find({
            userId,
            nextReviewAt: {$lte: now}
        });

        return pendingCards;
    }

    async reviewCard(id: string, userId: string) {
        const card = await this.findById(id, userId);

        const nextReview = new Date();

        switch(card.reviewStep) {
            case 0: 
                nextReview.setHours(nextReview.getHours() + 24);
                card.nextReviewAt = nextReview;
                card.reviewStep += 1;
                break;
            case 1: 
                nextReview.setDate(nextReview.getDate() + 7);
                card.nextReviewAt = nextReview;
                card.reviewStep += 1;
                break;
            case 2: 
            default:
                nextReview.setDate(nextReview.getDate() + 45);
                card.nextReviewAt = nextReview;
                card.reviewStep = 2;
                break;
        }

        card.lastReviewAt = new Date();
        await card.save();

        return card;
    }
}

export default CardService;
