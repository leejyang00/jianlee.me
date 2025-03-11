import { hc } from "hono/client";
import { type ApiRoutes } from "@api/index";
import { queryOptions } from "@tanstack/react-query";

const BASE_URL = process.env.NODE_ENV === 'development' // NODE_ENV is set by bun
  ? 'http://localhost:8787' // backend api url for development
  : 'https://api.jianlee.me'; // backend api url for production

const client = hc<ApiRoutes>(BASE_URL);

export const api = client.v1;

async function getBooks() {
  const res = await api.books.books_v1.$get();
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
