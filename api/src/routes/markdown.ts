import { Hono } from "hono";
import { getSupabaseClient, Bindings } from "@/db";
import matter from "gray-matter"; // Add this import

export const markdownRoute = new Hono<{ Bindings: Bindings }>()
  .get("/", async (c) => {
    const supabase = getSupabaseClient(c);

    // console.log('reaching out to supabase', supabase);
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

    console.log(buckets, 'buckets');
    
    try {
      // List all .md files from the blog-post bucket
      const { data: files, error } = await supabase.storage
        .from('blog-posts')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) {
        return c.json({ error: error.message }, 500);
      }

      // Filter for .md files only
      const markdownFiles = files?.filter(file => file.name.endsWith('.md')) || [];

      // console.log(markdownFiles, 'markdownFiles');

      c.status(200);
      return c.json(markdownFiles);
    } catch (error) {
      return c.json({ error: 'Failed to fetch markdown files' }, 500);
    }
  })
  .get("/content/:filename", async (c) => {
    const supabase = getSupabaseClient(c);
    const filename = c.req.param("filename");

    // Ensure the filename ends with .md
    if (!filename.endsWith('.md')) {
      return c.json({ error: "Invalid file format. Only .md files are allowed." }, 400);
    }

    try {
      // Get the file content from Supabase storage
      const { data, error } = await supabase.storage
        .from('blog-posts')
        .download(filename);

      if (error) {
        if (error.message.includes('not found')) {
          return c.json({ error: "File not found" }, 404);
        }
        return c.json({ error: error.message }, 500);
      }

      // Convert the blob to text
      const rawContent = await data.text();

       // Parse frontmatter using gray-matter
       const { data: frontmatter, content } = matter(rawContent);

      c.status(200);
      return c.json({
        filename,
        frontmatter,
        content,
        size: data.size,
        // lastModified: data.lastModified
      });
    } catch (error) {
      return c.json({ error: 'Failed to fetch file content' }, 500);
    }
  })
  .post("/content", async (c) => {
    const supabase = getSupabaseClient(c);
    
    try {
      const formData = await c.req.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return c.json({ error: "No file provided" }, 400);
      }

      if (!file.name.endsWith('.md')) {
        return c.json({ error: "Only .md files are allowed" }, 400);
      }

      console.log(file, "file");

      // Upload the file to Supabase storage
      const { data, error } = await supabase.storage
        .from('blog-posts')
        .upload(file.name, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'text/markdown'
        });

      if (error) {
        return c.json({ error: error.message }, 500);
      }

      c.status(201);
      return c.json({
        message: "File uploaded successfully",
        filename: data.path
      });
    } catch (error) {
      return c.json({ error: 'Failed to upload file' }, 500);
    }
  })
  .delete("/content/:filename", async (c) => {
    const supabase = getSupabaseClient(c);
    const filename = c.req.param("filename");

    if (!filename.endsWith('.md')) {
      return c.json({ error: "Invalid file format. Only .md files are allowed." }, 400);
    }

    try {
      const { error } = await supabase.storage
        .from('blog-posts')
        .remove([filename]);

      if (error) {
        return c.json({ error: error.message }, 500);
      }

      c.status(200);
      return c.json({ message: "File deleted successfully" });
    } catch (error) {
      return c.json({ error: 'Failed to delete file' }, 500);
    }
  })
  // get markdown database
  .get("/database", async (c) => {
    const supabase = getSupabaseClient(c);
    const { data, error } = await supabase.from('blog_posts').select('*');
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    c.status(200);
    return c.json(data);
  });
