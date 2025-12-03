import { FastifyInstance } from "fastify";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { desc } from "drizzle-orm";
import { uploadCsvToR2 } from "../../infra/r2"; 


function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export async function exportLinksRoute(app: FastifyInstance) {
  app.post("/links/export", async (_request, reply) => {
    // 1) Buscar todos os links
    const allLinks = await db.query.links.findMany({
      orderBy: desc(links.createdAt),
    });

    // 2) Montar o conteúdo CSV
    const header = [
      "id",
      "originalUrl",
      "shortCode",
      "clicks",
      "createdAt",
    ].join(",");

    const rows = allLinks.map((link) =>
      [
        escapeCsvValue(link.id),
        escapeCsvValue(link.originalUrl),
        escapeCsvValue(link.shortCode),
        escapeCsvValue(link.clicks),
        escapeCsvValue(link.createdAt?.toISOString?.() ?? link.createdAt),
      ].join(","),
    );

    const csvContent = header + "\n" + rows.join("\n");

    // 3) Em vez de salvar em disco, fazemos upload pra Cloudflare R2
    const { publicUrl } = await uploadCsvToR2(csvContent);

    // 4) Devolvemos a URL pública da CDN
    return reply.status(201).send({ fileUrl: publicUrl });
  });
}
