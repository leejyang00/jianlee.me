import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";
import { BookRequestBody, InsertBookBody } from "@/routes/type/booksType";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export const booksRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    // remove once the data is migrated to books_v1
    const supabase = getSupabaseClient(c);

    let { data: books_table, error } = await supabase
      .from("books_table")
      .select("*");

    if (error) {
      return c.json({ error: error.message }, 500);
    }
    c.status(200);
    return c.json(books_table);
  })
  .get("/books_v1", async (c) => {
    const supabase = getSupabaseClient(c);

    let { data } = await supabase.from("books_v1").select("*");

    c.status(200);
    return c.json(data);
  })
  .post("/books_v1", async (c) => {
    const supabase = getSupabaseClient(c);

    const volumeId = c.req.query("volume_id");
    const body: BookRequestBody = await c.req.json();

    if (!volumeId || !body) {
      return c.json({ error: "Volume ID and body are required" }, 400);
    }

    if (!body.affiliate_link) {
      return c.json({ error: "Affiliate link is required" }, 400);
    }

    // check if the book already exists
    let { data: book } = await supabase
      .from("books_v1")
      .select("*")
      .eq("volume_id", volumeId);

    if (book && book.length > 0) {
      return c.json({ error: "Book already exists" }, 201);
    }

    // query the book from google books api - cw0PEAAAQBAJ
    const googleBookApiResponse = await fetch(
      `${GOOGLE_BOOKS_API_URL}/${volumeId}`
    );
    const googleBookApiData: any = await googleBookApiResponse.json(); // any for now

    // create the book

    const volumeInfo = googleBookApiData.volumeInfo;

    const insertBookBody: InsertBookBody = {
      volume_id: googleBookApiData.id,
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      authors: { name: volumeInfo.authors },
      published_date: volumeInfo.publishedDate.split('-')[0],
      page_count: volumeInfo.pageCount,
      categories: { category: volumeInfo.categories },
      affiliate_link: volumeInfo.infoLink,
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
    return c.json({ message: `Book created successfully: ${data[0].title}, id: ${data[0].id}` });
  });
