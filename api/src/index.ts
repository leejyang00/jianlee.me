import { Hono } from 'hono'
import { logger } from 'hono/logger';
import { appRoute } from './routes/app';

const app = new Hono()

app.use(logger());

const apiRoutes = app.basePath('/v1').route('/', appRoute)

export default app
export type ApiRoutes = typeof apiRoutes;
