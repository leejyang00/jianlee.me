import { Hono } from "hono";
import { createClient } from "@supabase/supabase-js";

type Bindings = {
  SUPABASE_URL: string;
  SUPABASE_KEY: string;
}

export const booksRoute = new Hono<{ Bindings: Bindings }>();

booksRoute.get("/", async (c) => {
  const supabaseUrl = c.env.SUPABASE_URL
  const supabaseKey = c.env.SUPABASE_KEY

  console.log('supabaseUrl', supabaseUrl);
  console.log('supabaseKey', supabaseKey);

  if (!supabaseUrl || !supabaseKey) {
    return c.json({ error: 'Supabase credentials not found' }, 500)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  
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
