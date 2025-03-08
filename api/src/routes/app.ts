import { Hono } from "hono";

export const appRoute = new Hono()

appRoute.get('/', (c) => {
  return c.text('Hello Hono! - API Route')
})
