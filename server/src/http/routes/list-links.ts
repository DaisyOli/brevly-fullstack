import { FastifyInstance } from "fastify";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { desc } from "drizzle-orm";

export async function listLinksRoute(app: FastifyInstance) {
  app.get("/links", async () => {
    // Busca todos os links ordenados do mais novo pro mais antigo
    const allLinks = await db.query.links.findMany({
      orderBy: desc(links.createdAt),
    });

    // Fastify já responde com status 200 e JSON
    return allLinks;
  });
}
