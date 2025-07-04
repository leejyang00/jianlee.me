import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";

export interface PostRequestBody {
  title: string;
  content: string;
  description: string;
  tags: string[];
  image: string;
  slug: string;
  published: boolean;
}

export interface InsertPostBody {
  id?: string;
  title: string;
  content: string;
  description: string;
  tags: string[];
  image: string;
  slug: string;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export const postsRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const supabase = getSupabaseClient(c);

    let { data } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    c.status(200);
    return c.json(data);
  })
  .get("/:slug", async (c) => {
    const supabase = getSupabaseClient(c);
    const slug = c.req.param("slug");

    let { data } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (!data) {
      return c.json({ error: "Post not found" }, 404);
    }

    c.status(200);
    return c.json(data);
  })
  .post("/", async (c) => {
    const supabase = getSupabaseClient(c);

    const body: PostRequestBody = await c.req.json();
    const { title, content, description, tags, image, slug, published } = body;

    if (!title || !content || !slug) {
      return c.json({ error: "Title, content, and slug are required" }, 400);
    }

    // Check if the post already exists
    let { data: existingPost } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug);

    if (existingPost && existingPost.length > 0) {
      return c.json({ error: "Post with this slug already exists" }, 409);
    }

    // Create the post
    const insertPostBody: InsertPostBody = {
      title,
      content,
      description,
      tags,
      image,
      slug,
      published: published || false,
    };

    const { data, error } = await supabase
      .from("posts")
      .insert(insertPostBody)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    c.status(201);
    return c.json(data);
  })
  .put("/:id", async (c) => {
    const supabase = getSupabaseClient(c);
    const id = c.req.param("id");

    const body: Partial<PostRequestBody> = await c.req.json();

    const { data, error } = await supabase
      .from("posts")
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    c.status(200);
    return c.json(data);
  })
  .delete("/:id", async (c) => {
    const supabase = getSupabaseClient(c);
    const id = c.req.param("id");

    const { error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (error) {
      return c.json({ error: error.message }, 500);
    }

    c.status(204);
    return c.json({ message: "Post deleted successfully" });
  }); 
