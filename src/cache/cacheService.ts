import fs from "fs/promises";
import path from "path";
import searchRedditPosts from "../webScraping/searchRedditPosts";


class CacheService {
    CACHE_FILE = "./data/reddit-cache.json";

    async saveCache(posts: any[]) {
        const payload = {
            updatedAt: new Date().toISOString(),
            data: posts
        };

        await fs.mkdir(path.dirname(this.CACHE_FILE), { recursive: true });
        await fs.writeFile(this.CACHE_FILE, JSON.stringify(payload, null, 2));
    }

    async readCache() {
        try {
            const file = await fs.readFile(this.CACHE_FILE, "utf-8");
            return JSON.parse(file);
        } catch {
            return {
                updatedAt: null,
                data: []
            };
        }
    }

    async updateRedditCache() {
        try {
            console.log("Atualizando cache do Reddit...");

            const posts = await searchRedditPosts();

            await this.saveCache(posts);

            console.log("Cache do Reddit atualizado.");
        } catch (error) {
            console.error("Erro ao atualizar cache do Reddit:", error);
        }
    }


}


export default CacheService;
