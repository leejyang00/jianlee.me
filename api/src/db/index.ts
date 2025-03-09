import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env, 'all env variables');

// For debugging purposes, you can keep the console.log
console.log(process.env.URL_DB, 'database url');

// const client = postgres(process.env.DATABASE_URL!);
const client = postgres("postgresql://postgres:C0micb00k4!@db.hwzdpumncxpshgvhewht.supabase.co:5432/postgres");

export const db = drizzle({ client });
