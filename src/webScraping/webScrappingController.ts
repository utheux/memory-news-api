import { FastifyReply, FastifyRequest } from "fastify";
import CacheService from "../cache/cacheService";


export class WebScrappingController {
    constructor(private readonly cacheService: CacheService) {}

    async getReddit(request: FastifyRequest, reply: FastifyReply) {
        const cache = await this.cacheService.readCache();

        reply.status(200).send(cache.data);
    };
}

export default WebScrappingController;  
