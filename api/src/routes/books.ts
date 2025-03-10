import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";

export const booksRoute = new Hono<{ Bindings: Bindings }>();

booksRoute.get("/", async (c) => {
  const supabase = getSupabaseClient(c);
  
  let { data: books_table, error } = await supabase
  .from('books_table')
  .select('*')

  if (error) {
    return c.json({ error: error.message }, 500)
  }
  c.status(200);
  console.log('books_table', books_table);
  return c.json(books_table);
});
