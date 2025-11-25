import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "./schema";

const { Client } = pkg;

// Configura o cliente do Postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// Abre a conexão
client.connect();                                                                                                                                                                                       

// Cria o objeto `db` usado para fazer queries
export const db = drizzle(client, { schema });
