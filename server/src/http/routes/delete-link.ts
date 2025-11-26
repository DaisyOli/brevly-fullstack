import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function deleteLinkRoute(app: FastifyInstance) {
  app.delete("/links/:shortCode", async (request, reply) => {
    // 1) Validar parâmetros
    const paramsSchema = z.object({
      shortCode: z.string(),
    });

    const { shortCode } = paramsSchema.parse(request.params);

    // 2) Verificar se existe
    const link = await db.query.links.findFirst({
      where: eq(links.shortCode, shortCode),
    });

    if (!link) {
      return reply.status(404).send({
        message: "Link não encontrado.",
      });
    }

    // 3) Deletar
    await db.delete(links).where(eq(links.id, link.id));

    // 4) Responder 204 sem body
    return reply.status(204).send();
  });
}
