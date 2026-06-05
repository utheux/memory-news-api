import mongoose from "mongoose";
import Card from "../card/cardModel.js";
import { connectMongo } from "../database/mongodb.js";

const userId = new mongoose.Types.ObjectId("6a13be4c68fc1f4797755552");

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const nextWeek = new Date(today);
nextWeek.setDate(nextWeek.getDate() + 7);

const cards = [
    {
        userId,
        title: "Fundamentos de TypeScript",
        description: "Revisar tipos primitivos, interfaces e generics.",
        reviewStep: 0,
        nextReviewAt: today,
    },
    {
        userId,
        title: "Fastify com sessões",
        description: "Entender como o userId fica salvo na session do Fastify.",
        reviewStep: 1,
        nextReviewAt: yesterday,
        lastReviewAt: yesterday,
    },
    {
        userId,
        title: "Mongoose relacionando documentos",
        description: "Usar ObjectId com ref para associar cards ao usuário.",
        reviewStep: 2,
        nextReviewAt: nextWeek,
        lastReviewAt: today,
    },
];

async function seedCards() {
    await connectMongo();

    await Card.deleteMany({ userId });
    await Card.insertMany(cards);

    console.log(`${cards.length} cards criados para o usuário ${userId.toString()}.`);

    await mongoose.disconnect();
}

seedCards().catch(async (error) => {
    console.error("Erro ao popular cards:", error);
    await mongoose.disconnect();
    process.exit(1);
});
