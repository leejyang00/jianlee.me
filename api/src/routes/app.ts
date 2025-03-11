import { Hono } from "hono";

export const appRoute = new Hono()
  .get('/', (c) => {
    return c.text('Hello Hono! - API Route')
  })
