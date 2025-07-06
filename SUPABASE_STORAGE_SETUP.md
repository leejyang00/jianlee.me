# Supabase Storage Setup for Blog Posts

This document explains how to set up Supabase Storage to automatically upload markdown files from your blog posts folder.

## Prerequisites

1. A Supabase project
2. GitHub repository with the blog posts in `src/lib/posts/`

## Setup Instructions

### 1. Create Supabase Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Name the bucket `blog-posts`
5. Set the bucket as **Public** (if you want the files to be publicly accessible)
6. Click **Create bucket**

### 2. Configure Storage Policies

After creating the bucket, you need to set up storage policies to allow uploads:

1. Go to **Storage** → **Policies**
2. Click on the `blog-posts` bucket
3. Add the following policies:

#### Policy for Uploading Files
```sql
-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'blog-posts' AND 
  auth.role() = 'authenticated'
);
```

#### Policy for Reading Files
```sql
-- Allow public read access to blog posts
CREATE POLICY "Allow public read access" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-posts');
```

### 3. Get Supabase Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (e.g., `https://your-project.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### 4. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following repository secrets:

| Secret Name | Value |
|-------------|-------|
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

### 5. Test the Workflow

1. Add a new markdown file to `src/lib/posts/`
2. Commit and push to the `main` branch
3. Check the **Actions** tab in your GitHub repository
4. The workflow should automatically trigger and upload the file to Supabase Storage

## Workflow Details

The GitHub workflow (`deploy-blog-posts-md.yaml`) will:

1. **Trigger**: When markdown files are added/modified in `src/lib/posts/`
2. **Upload**: All markdown files from the posts directory to the `blog-posts` bucket
3. **Verify**: List the uploaded files to confirm success

## Accessing Files

Once uploaded, you can access your markdown files via:

```
https://your-project.supabase.co/storage/v1/object/public/blog-posts/filename.md
```

## Troubleshooting

### Common Issues

1. **Authentication Error**: Make sure your `SUPABASE_SERVICE_ROLE_KEY` is correct
2. **Bucket Not Found**: Ensure the `blog-posts` bucket exists in your Supabase project
3. **Permission Denied**: Check that your storage policies allow the required operations

### Debug Steps

1. Check the workflow logs in GitHub Actions
2. Verify your Supabase credentials are correct
3. Ensure the storage bucket and policies are properly configured

## Security Notes

- The `SUPABASE_SERVICE_ROLE_KEY` has admin privileges - keep it secure
- Consider using environment-specific buckets for development/production
- Review and adjust storage policies based on your security requirements 
