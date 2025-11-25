import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function redirectLinkRoute(app: FastifyInstance) {
  app.get("/:shortCode", async (request, reply) => {
    // 1) Validar os params
    const paramsSchema = z.object({
      shortCode: z.string(),
    });

    const { shortCode } = paramsSchema.parse(request.params);

    // 2) Buscar o link no banco
    const link = await db.query.links.findFirst({
      where: eq(links.shortCode, shortCode),
    });

    if (!link) {
      return reply.status(404).send({
        message: "Link não encontrado.",
      });
    }

    // 3) Incrementar a contagem de cliques
    await db
      .update(links)
      .set({ clicks: link.clicks + 1 })
      .where(eq(links.id, link.id));

    // 4) Redirecionar para a URL original
    return reply.redirect(link.originalUrl);
  });
}
