import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";

export const gearsRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const supabase = getSupabaseClient(c);

    let { data } = await supabase.from("gears").select("*");

    c.status(200);
    return c.json(data);
  })
  .get("/:category", async (c) => {
    const supabase = getSupabaseClient(c);

    const category = c.req.param("category");

    let { data } = await supabase.from("gears").select("*").eq("category", category);

    c.status(200);
    return c.json(data);
  })
  .post("/", async (c) => {
    const supabase = getSupabaseClient(c);

    const body: InsertGearBody = await c.req.json();
    const { title, description, amazon_link, image_link, category } = body;

    if (!title || !description || !amazon_link || !image_link) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // check if the gear already exists
    let { data: gear } = await supabase
      .from("gears")
      .select("*")
      .eq("title", title);

    if (gear && gear.length > 0) {
      return c.json({ error: "Gear already exists" }, 201);
    }

    const insertGearBody: InsertGearBody = {
      title,
      description,
      amazon_link,
      image_link,
      category,
    };

    const { data, error } = await supabase
      .from("gears")
      .insert(insertGearBody)
      .select();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    c.status(201);
    return c.json({
      message: `Gear created successfully: ${data[0].title}, id: ${data[0].id}`,
    });
  });
