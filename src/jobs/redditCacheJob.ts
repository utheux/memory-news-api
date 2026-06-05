import cron from "node-cron";
import CacheService from "../cache/cacheService.js";

export async function startRedditCacheJob() {
    const cacheService = new CacheService();

    await cacheService.updateRedditCache();

    cron.schedule("0 8 * * *", async () => {
        await cacheService.updateRedditCache();
    });
}
