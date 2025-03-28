/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WorksIndexImport } from './routes/works/index'
import { Route as GearsIndexImport } from './routes/gears/index'
import { Route as BooksIndexImport } from './routes/books/index'
import { Route as WorksPacematesImport } from './routes/works/pacemates'
import { Route as WorksGbrgroupcoImport } from './routes/works/gbrgroupco'

// Create Virtual Routes

const UsesLazyImport = createFileRoute('/uses')()

// Create/Update Routes

const UsesLazyRoute = UsesLazyImport.update({
  id: '/uses',
  path: '/uses',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/uses.lazy').then((d) => d.Route))

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WorksIndexRoute = WorksIndexImport.update({
  id: '/works/',
  path: '/works/',
  getParentRoute: () => rootRoute,
} as any)

const GearsIndexRoute = GearsIndexImport.update({
  id: '/gears/',
  path: '/gears/',
  getParentRoute: () => rootRoute,
} as any)

const BooksIndexRoute = BooksIndexImport.update({
  id: '/books/',
  path: '/books/',
  getParentRoute: () => rootRoute,
} as any)

const WorksPacematesRoute = WorksPacematesImport.update({
  id: '/works/pacemates',
  path: '/works/pacemates',
  getParentRoute: () => rootRoute,
} as any)

const WorksGbrgroupcoRoute = WorksGbrgroupcoImport.update({
  id: '/works/gbrgroupco',
  path: '/works/gbrgroupco',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/uses': {
      id: '/uses'
      path: '/uses'
      fullPath: '/uses'
      preLoaderRoute: typeof UsesLazyImport
      parentRoute: typeof rootRoute
    }
    '/works/gbrgroupco': {
      id: '/works/gbrgroupco'
      path: '/works/gbrgroupco'
      fullPath: '/works/gbrgroupco'
      preLoaderRoute: typeof WorksGbrgroupcoImport
      parentRoute: typeof rootRoute
    }
    '/works/pacemates': {
      id: '/works/pacemates'
      path: '/works/pacemates'
      fullPath: '/works/pacemates'
      preLoaderRoute: typeof WorksPacematesImport
      parentRoute: typeof rootRoute
    }
    '/books/': {
      id: '/books/'
      path: '/books'
      fullPath: '/books'
      preLoaderRoute: typeof BooksIndexImport
      parentRoute: typeof rootRoute
    }
    '/gears/': {
      id: '/gears/'
      path: '/gears'
      fullPath: '/gears'
      preLoaderRoute: typeof GearsIndexImport
      parentRoute: typeof rootRoute
    }
    '/works/': {
      id: '/works/'
      path: '/works'
      fullPath: '/works'
      preLoaderRoute: typeof WorksIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/uses': typeof UsesLazyRoute
  '/works/gbrgroupco': typeof WorksGbrgroupcoRoute
  '/works/pacemates': typeof WorksPacematesRoute
  '/books': typeof BooksIndexRoute
  '/gears': typeof GearsIndexRoute
  '/works': typeof WorksIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/uses': typeof UsesLazyRoute
  '/works/gbrgroupco': typeof WorksGbrgroupcoRoute
  '/works/pacemates': typeof WorksPacematesRoute
  '/books': typeof BooksIndexRoute
  '/gears': typeof GearsIndexRoute
  '/works': typeof WorksIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/uses': typeof UsesLazyRoute
  '/works/gbrgroupco': typeof WorksGbrgroupcoRoute
  '/works/pacemates': typeof WorksPacematesRoute
  '/books/': typeof BooksIndexRoute
  '/gears/': typeof GearsIndexRoute
  '/works/': typeof WorksIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/uses'
    | '/works/gbrgroupco'
    | '/works/pacemates'
    | '/books'
    | '/gears'
    | '/works'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/uses'
    | '/works/gbrgroupco'
    | '/works/pacemates'
    | '/books'
    | '/gears'
    | '/works'
  id:
    | '__root__'
    | '/'
    | '/uses'
    | '/works/gbrgroupco'
    | '/works/pacemates'
    | '/books/'
    | '/gears/'
    | '/works/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  UsesLazyRoute: typeof UsesLazyRoute
  WorksGbrgroupcoRoute: typeof WorksGbrgroupcoRoute
  WorksPacematesRoute: typeof WorksPacematesRoute
  BooksIndexRoute: typeof BooksIndexRoute
  GearsIndexRoute: typeof GearsIndexRoute
  WorksIndexRoute: typeof WorksIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  UsesLazyRoute: UsesLazyRoute,
  WorksGbrgroupcoRoute: WorksGbrgroupcoRoute,
  WorksPacematesRoute: WorksPacematesRoute,
  BooksIndexRoute: BooksIndexRoute,
  GearsIndexRoute: GearsIndexRoute,
  WorksIndexRoute: WorksIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/uses",
        "/works/gbrgroupco",
        "/works/pacemates",
        "/books/",
        "/gears/",
        "/works/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/uses": {
      "filePath": "uses.lazy.tsx"
    },
    "/works/gbrgroupco": {
      "filePath": "works/gbrgroupco.tsx"
    },
    "/works/pacemates": {
      "filePath": "works/pacemates.tsx"
    },
    "/books/": {
      "filePath": "books/index.tsx"
    },
    "/gears/": {
      "filePath": "gears/index.tsx"
    },
    "/works/": {
      "filePath": "works/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
