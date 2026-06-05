import fastify from "fastify";
import cookie from "@fastify/cookie";
import session from "@fastify/session";
import { env } from "./config/env.js";
import { connectMongo } from "./database/mongodb.js";
import User from "./user/userModel.js";
import { userRoutes } from "./user/userRoutes.js";
import { webScreappingRoutes } from "./webScraping/webScrappingRoutes.js";
import { startRedditCacheJob } from "./jobs/redditCacheJob.js";
import { cardRoutes } from "./card/cardRoutes.js";


async function start() {
  await connectMongo();
  await User.createCollection();

  await startRedditCacheJob();
  
  const app = fastify({ logger: true });

  await app.register(cookie);
  await app.register(session, {
    secret: env.sessionSecret,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    }
  });

  userRoutes(app);
  cardRoutes(app);
  webScreappingRoutes(app);

  await app.listen({
    port: env.port
  }).then(() => console.log('Server running in: ' + env.port));
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
