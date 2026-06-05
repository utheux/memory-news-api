import mongoose from "mongoose";
import cardSchema from "./cardSchema";

const Card = mongoose.model("cards", cardSchema);

export default Card;
