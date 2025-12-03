import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

// Aqui usamos DIRECTAMENTE process.env, porque você não tem env.ts
const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function uploadCsvToR2(csvContent: string) {
  const fileName = `exports/links-${randomUUID()}.csv`;

  await r2Client.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET!,
      Key: fileName,
      Body: Buffer.from(csvContent, "utf-8"),
      ContentType: "text/csv",
    }),
  );

  const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_URL}/${fileName}`;

  return { fileName, publicUrl };
}
