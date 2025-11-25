import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { eq } from "drizzle-orm";

function generateShortCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * chars.length);
    result += chars[index];
  }

  return result;
}

export async function createLinkRoute(app: FastifyInstance) {
  app.post("/links", async (request, reply) => {
    // 1) Validar o corpo da requisição
    const bodySchema = z.object({
      originalUrl: z.string().url({ message: "originalUrl deve ser uma URL válida" }),
      shortCode: z
        .string()
        .regex(/^[a-zA-Z0-9_-]+$/, {
          message: "shortCode só pode conter letras, números, '-' e '_'",
        })
        .min(3, { message: "shortCode deve ter pelo menos 3 caracteres" })
        .max(32)
        .optional(),
    });

    const parseResult = bodySchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        message: "Dados inválidos",
        issues: parseResult.error.format(),
      });
    }

    const { originalUrl, shortCode: shortCodeFromBody } = parseResult.data;

    // 2) Definir ou gerar o shortCode
    let shortCode = shortCodeFromBody ?? generateShortCode(8);

    // 3) Garantir que o shortCode não está sendo usado
    if (shortCodeFromBody) {
      const existing = await db.query.links.findFirst({
        where: eq(links.shortCode, shortCode),
      });

      if (existing) {
        return reply.status(400).send({
          message: "Este shortCode já está em uso.",
        });
      }
    } else {
      let existing = await db.query.links.findFirst({
        where: eq(links.shortCode, shortCode),
      });

      while (existing) {
        shortCode = generateShortCode(8);
        existing = await db.query.links.findFirst({
          where: eq(links.shortCode, shortCode),
        });
      }
    }

    // 4) Inserir no banco
    const [link] = await db
      .insert(links)
      .values({
        originalUrl,
        shortCode,
      })
      .returning();

    // 5) Responder com 201 + o registro criado
    return reply.status(201).send(link);
  });
}
