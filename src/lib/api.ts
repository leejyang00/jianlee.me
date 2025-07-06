import { hc } from "hono/client";
import { type ApiRoutes } from "@api/index";
import { queryOptions } from "@tanstack/react-query";
import { BlogPost } from "./types/markdown";

const BASE_URL = process.env.NODE_ENV === 'development' // NODE_ENV is set by bun
  ? 'http://localhost:8787' // backend api url for development
  : 'https://api.jianlee.me'; // backend api url for production

const client = hc<ApiRoutes>(BASE_URL);

export const api = client.v1;

async function getBooks() {
  const res = await api.books_v1.$get();
  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
}

export const booksQueryOptions = queryOptions({
  queryKey: ["get-books"],
  queryFn: getBooks,
  staleTime: Infinity,
});

async function getGears() {
  const res = await api.gears.$get();
  if (!res.ok) {
    throw new Error("Server Error");
  }
  const data = await res.json();
  return data;
}

export const gearsQueryOptions = queryOptions({
  queryKey: ["get-gears"],
  queryFn: getGears,
  staleTime: Infinity,
});

// Markdown API functions
async function getMarkdownFiles() {
  const res = await api.markdown.$get();
  console.log(res, 'res');
  if (!res.ok) {
    throw new Error("Failed to fetch markdown files");
  }
  const data = await res.json();
  return data;
}

export const markdownFilesQueryOptions = queryOptions({
  queryKey: ["get-markdown-files"],
  queryFn: getMarkdownFiles,
  staleTime: 5 * 60 * 1000, // 5 minutes
});

async function getMarkdownContent(filename: string) {
  const res = await api.markdown.content[":filename"].$get({
    param: { filename }
  });
  if (!res.ok) {
    throw new Error("Failed to fetch markdown content");
  }
  const data = await res.json();
  return data;
}

export const markdownContentQueryOptions = (filename: string) => queryOptions({
  queryKey: ["get-markdown-content", filename],
  queryFn: () => getMarkdownContent(filename),
  staleTime: 10 * 60 * 1000, // 10 minutes
  enabled: !!filename,
});

// Upload markdown file
export async function uploadMarkdownFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await api.markdown.content.$post({
    form: formData
  });
  
  if (!res.ok) {
    throw new Error("Failed to upload markdown file");
  }
  
  return res.json();
}

// Delete markdown file
export async function deleteMarkdownFile(filename: string) {
  const res = await api.markdown.content[":filename"].$delete({
    param: { filename }
  });
  
  if (!res.ok) {
    throw new Error("Failed to delete markdown file");
  }
  
  return res.json();
}

async function getMarkdownDatabase() {
  const res = await api.markdown.database.$get();
  if (!res.ok) {
    throw new Error("Failed to fetch markdown database");
  }
  const data = await res.json();
  return data;
}

export const getMarkdownDatabaseQuery = queryOptions({
  queryKey: ["get-markdown-database"],
  queryFn: (): Promise<BlogPost[]> => getMarkdownDatabase(),
  staleTime: 10 * 60 * 1000, // 10 minutes
});
