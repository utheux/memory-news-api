import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    reviewStep: {
        type: Number,
        default: 0
    },
    nextReviewAt: {
        type: Date,
        default: Date.now
    },
    lastReviewAt: {
        type: Date
    },
    },
    {
        collection: "cards",
        timestamps: true
    }

);

export default cardSchema;
