import { Hono } from 'hono'
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { appRoute } from './routes/app';
import { booksRoute } from './routes/books';

const app = new Hono()

app.use(logger());
app.use(cors({
  origin: ['https://jianlee.me', 'https://www.jianlee.me', 'http://localhost:5173'],
  // allowHeaders: ['Content-Type', 'Authorization'],
  // allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // exposeHeaders: ['Content-Type', 'Authorization'],
  // credentials: true,
})); // Cross-Origin Resource Sharing

const apiRoutes = app
  .basePath('/v1')
  .route('/', appRoute)
  .route('/books', booksRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
