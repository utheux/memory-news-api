import { FastifyInstance } from "fastify";
import CacheService from "../cache/cacheService";
import { authMiddleware } from "../middlewares/authMiddleware";
import WebScrappingController from "./webScrappingController";

const cacheService = new CacheService();
const webScrappingController = new WebScrappingController(cacheService);

export const webScreappingRoutes = async (app: FastifyInstance) => {
    app.get(
        "/redditPosts",
        { preHandler: authMiddleware },
        webScrappingController.getReddit.bind(webScrappingController)
    );
}
