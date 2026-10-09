import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";

export const booksRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const supabase = getSupabaseClient(c);

    let { data } = await supabase
      .from("books_v1")
      .select("*")
      .order("read_at", { ascending: false });

    c.status(200);
    return c.json(data);
  });
