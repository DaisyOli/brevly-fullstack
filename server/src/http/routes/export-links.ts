import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "../../db/connection";
import { links } from "../../db/schema";
import { desc } from "drizzle-orm";
import fs from "fs";
import { promises as fsPromises } from "fs";
import path from "path";

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  // Se tiver vírgula, aspas ou quebra de linha, envolver em aspas
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export async function exportLinksRoute(app: FastifyInstance) {
  // 1) Rota para gerar o CSV
  app.post("/links/export", async (_request, reply) => {
    // Buscar todos os links
    const allLinks = await db.query.links.findMany({
      orderBy: desc(links.createdAt),
    });

    // Montar o conteúdo CSV
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

    // Pasta onde vamos salvar os arquivos
    const exportDir = path.resolve(__dirname, "../../../exports");

    await fsPromises.mkdir(exportDir, { recursive: true });

    // Gerar nome único pro arquivo
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `links-${timestamp}.csv`;
    const filePath = path.join(exportDir, fileName);

    // Escrever o arquivo
    await fsPromises.writeFile(filePath, csvContent, "utf-8");

    // URL pública local para download
    const fileUrl = `http://localhost:3333/exports/${fileName}`;

    return reply.status(201).send({ fileUrl });
  });

  // 2) Rota para servir o arquivo CSV
  app.get("/exports/:fileName", async (request, reply) => {
    const paramsSchema = z.object({
      fileName: z.string(),
    });

    const { fileName } = paramsSchema.parse(request.params);

    const exportDir = path.resolve(__dirname, "../../../exports");
    const filePath = path.join(exportDir, fileName);

    if (!fs.existsSync(filePath)) {
      return reply.status(404).send({ message: "Arquivo não encontrado." });
    }

    reply.header("Content-Type", "text/csv");
    reply.header("Content-Disposition", `attachment; filename="${fileName}"`);

    const stream = fs.createReadStream(filePath);
    return reply.send(stream);
  });
}
