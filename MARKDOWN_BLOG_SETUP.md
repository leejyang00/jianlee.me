# Markdown Blog Setup Guide

This guide explains how to set up and use the markdown blog system that fetches .md files from Supabase storage.

## Prerequisites

1. Supabase project with storage enabled
2. API keys configured in your environment variables
3. A storage bucket named `blog-posts` created in Supabase

## Setup Instructions

### 1. Create Supabase Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket named `blog-posts`
4. Set the bucket to public (if you want public access) or private (if you want authenticated access)
5. Configure RLS (Row Level Security) policies as needed

### 2. Environment Variables

Make sure your environment variables are set up in your `.dev.vars` file:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Storage Policies (Optional)

If you want to restrict access, you can set up RLS policies. Here's an example for public read access:

```sql
-- Allow public read access to blog posts
CREATE POLICY "Public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-posts');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-posts' AND auth.role() = 'authenticated');

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own uploads" ON storage.objects
FOR DELETE USING (bucket_id = 'blog-posts' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## API Endpoints

The markdown blog system provides the following API endpoints:

### GET `/v1/markdown`
Lists all .md files in the `blog-posts` bucket.

**Response:**
```json
[
  {
    "name": "my-blog-post.md",
    "id": "file-id",
    "updated_at": "2024-01-01T00:00:00Z",
    "created_at": "2024-01-01T00:00:00Z",
    "last_accessed_at": "2024-01-01T00:00:00Z",
    "metadata": {
      "eTag": "etag",
      "size": 1024,
      "mimetype": "text/markdown",
      "cacheControl": "3600",
      "lastModified": "2024-01-01T00:00:00Z",
      "contentLength": 1024,
      "httpStatusCode": 200
    }
  }
]
```

### GET `/v1/markdown/:filename`
Downloads and returns the content of a specific .md file.

**Response:**
```json
{
  "filename": "my-blog-post.md",
  "content": "# My Blog Post\n\nThis is the content...",
  "size": 1024,
  "lastModified": 1704067200000
}
```

### POST `/v1/markdown`
Uploads a new .md file to the `blog-posts` bucket.

**Request:** Form data with a file field containing the .md file.

**Response:**
```json
{
  "message": "File uploaded successfully",
  "filename": "my-blog-post.md"
}
```

### DELETE `/v1/markdown/:filename`
Deletes a .md file from the `blog-posts` bucket.

**Response:**
```json
{
  "message": "File deleted successfully"
}
```

## Frontend Usage

### Basic Usage

```tsx
import { useQuery } from '@tanstack/react-query';
import { markdownFilesQueryOptions, markdownContentQueryOptions } from '../lib/api';

function BlogComponent() {
  // Get list of markdown files
  const { data: files } = useQuery(markdownFilesQueryOptions);
  
  // Get content of a specific file
  const { data: content } = useQuery(markdownContentQueryOptions('my-blog-post.md'));
  
  return (
    <div>
      {files?.map(file => (
        <div key={file.id}>{file.name}</div>
      ))}
      
      {content && (
        <div>
          <h1>{content.filename}</h1>
          <pre>{content.content}</pre>
        </div>
      )}
    </div>
  );
}
```

### Using the MarkdownBlog Component

The `MarkdownBlog` component provides a complete interface for managing markdown blog posts:

```tsx
import { MarkdownBlog } from '../components/MarkdownBlog';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <MarkdownBlog />
    </div>
  );
}
```

## Dependencies

Make sure you have the following dependencies installed:

```bash
# For markdown rendering
npm install react-markdown

# For API client (already included)
npm install hono
```

## Example Markdown File

Here's an example of a blog post markdown file:

```markdown
# My First Blog Post

This is my first blog post written in markdown.

## Features

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- `Code snippets` for technical content
- [Links](https://example.com) for references

## Code Example

```javascript
function hello() {
  console.log("Hello, World!");
}
```

## Lists

1. First item
2. Second item
3. Third item

- Unordered item
- Another item
- Yet another item

---

*Published on January 1, 2024*
```

## Security Considerations

1. **File Validation**: The API only accepts .md files
2. **Size Limits**: Consider implementing file size limits
3. **Authentication**: Implement proper authentication for upload/delete operations
4. **Rate Limiting**: Consider implementing rate limiting for API endpoints
5. **Content Sanitization**: Sanitize markdown content before rendering

## Troubleshooting

### Common Issues

1. **"Bucket not found" error**: Make sure the `blog-posts` bucket exists in your Supabase project
2. **"Permission denied" error**: Check your storage policies and API key permissions
3. **"File not found" error**: Verify the filename exists in the bucket
4. **CORS errors**: Ensure your CORS settings allow requests from your frontend domain

### Debug Tips

1. Check the browser's network tab for API request/response details
2. Verify environment variables are correctly set
3. Test API endpoints directly using tools like Postman or curl
4. Check Supabase logs for server-side errors

## Performance Optimization

1. **Caching**: The API uses React Query for client-side caching
2. **Lazy Loading**: Consider implementing lazy loading for large markdown files
3. **CDN**: Use Supabase's CDN for faster file delivery
4. **Compression**: Enable gzip compression for text files 
