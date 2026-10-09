// v1 is frozen: these used to call api.jianlee.me (a Worker reading Supabase).
// src/data/ holds that API's responses as of 2026-10-10, so v1.jianlee.me keeps
// working with no backend. Same exports as before, so the pages are unchanged.
import { queryOptions } from "@tanstack/react-query";
import { BlogPost } from "./types/markdown";
import books from "@/data/books.json";
import gears from "@/data/gears.json";
import markdownFiles from "@/data/markdown-files.json";
import markdownContent from "@/data/markdown-content.json";
import blogPosts from "@/data/blog_posts.json";

// The old Hono client's types never resolved, so the pages were written against
// `any`. Keep that, so they compile exactly as before.
/* eslint-disable @typescript-eslint/no-explicit-any */
const frozen = (data: unknown) => data as any;

export const booksQueryOptions = queryOptions({
  queryKey: ["get-books"],
  queryFn: async () => frozen(books),
  staleTime: Infinity,
});

export const gearsQueryOptions = queryOptions({
  queryKey: ["get-gears"],
  queryFn: async () => frozen(gears),
  staleTime: Infinity,
});

export const markdownFilesQueryOptions = queryOptions({
  queryKey: ["get-markdown-files"],
  queryFn: async () => frozen(markdownFiles),
  staleTime: Infinity,
});

const content: Record<string, unknown> = markdownContent;

export const markdownContentQueryOptions = (filename: string) =>
  queryOptions({
    queryKey: ["get-markdown-content", filename],
    queryFn: async () => {
      const file = content[filename];
      if (!file) throw new Error("File not found");
      return frozen(file);
    },
    staleTime: Infinity,
    enabled: !!filename,
  });

export const getMarkdownDatabaseQuery = queryOptions({
  queryKey: ["get-markdown-database"],
  queryFn: async (): Promise<BlogPost[]> => frozen(blogPosts),
  staleTime: Infinity,
});
