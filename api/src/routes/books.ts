import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";
import { BookRequestBody, InsertBookBody } from "@/routes/type/booksType";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export const booksRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const supabase = getSupabaseClient(c);

    let { data } = await supabase
      .from("books_v1")
      .select("*")
      .order("read_at", { ascending: false });

    c.status(200);
    return c.json(data);
  })
  .post("/", async (c) => {
    const supabase = getSupabaseClient(c);

    const body: BookRequestBody = await c.req.json();
    const { volume_id, affiliate_link, read_at } = body;

    if (!affiliate_link || !volume_id || !read_at) {
      return c.json({ error: "Affiliate link or volume ID are required" }, 400);
    }

    // check if the book already exists
    let { data: book } = await supabase
      .from("books_v1")
      .select("*")
      .eq("volume_id", volume_id);

    if (book && book.length > 0) {
      return c.json({ error: "Book already exists" }, 201);
    }

    // query the book from google books api - cw0PEAAAQBAJ
    const googleBookApiResponse = await fetch(
      `${GOOGLE_BOOKS_API_URL}/${volume_id}`
    );
    const googleBookApiData: any = await googleBookApiResponse.json(); // any for now

    // create the book

    const volumeInfo = googleBookApiData.volumeInfo;

    const insertBookBody: InsertBookBody = {
      volume_id: googleBookApiData.id,
      read_at: read_at,
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      authors: { name: volumeInfo.authors },
      published_date: volumeInfo.publishedDate.split("-")[0],
      page_count: volumeInfo.pageCount,
      categories: { category: volumeInfo.categories },
      affiliate_link: affiliate_link,
      thumbnail: volumeInfo.imageLinks.thumbnail,
    };

    const { data, error } = await supabase
      .from("books_v1")
      .insert(insertBookBody)
      .select();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    c.status(201);
    return c.json({
      message: `Book created successfully: ${data[0].title}, id: ${data[0].id}`,
    });
  });
