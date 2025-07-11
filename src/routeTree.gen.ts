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
import { Route as ProjectsIndexImport } from './routes/projects/index'
import { Route as GearsIndexImport } from './routes/gears/index'
import { Route as BooksIndexImport } from './routes/books/index'
import { Route as ProjectsPacematesRunclubImport } from './routes/projects/pacemates-runclub'
import { Route as ProjectsGbrgroupcoImport } from './routes/projects/gbrgroupco'
import { Route as ProjectsSlugImport } from './routes/projects/$slug'

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

const ProjectsIndexRoute = ProjectsIndexImport.update({
  id: '/projects/',
  path: '/projects/',
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

const ProjectsPacematesRunclubRoute = ProjectsPacematesRunclubImport.update({
  id: '/projects/pacemates-runclub',
  path: '/projects/pacemates-runclub',
  getParentRoute: () => rootRoute,
} as any)

const ProjectsGbrgroupcoRoute = ProjectsGbrgroupcoImport.update({
  id: '/projects/gbrgroupco',
  path: '/projects/gbrgroupco',
  getParentRoute: () => rootRoute,
} as any)

const ProjectsSlugRoute = ProjectsSlugImport.update({
  id: '/projects/$slug',
  path: '/projects/$slug',
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
    '/projects/$slug': {
      id: '/projects/$slug'
      path: '/projects/$slug'
      fullPath: '/projects/$slug'
      preLoaderRoute: typeof ProjectsSlugImport
      parentRoute: typeof rootRoute
    }
    '/projects/gbrgroupco': {
      id: '/projects/gbrgroupco'
      path: '/projects/gbrgroupco'
      fullPath: '/projects/gbrgroupco'
      preLoaderRoute: typeof ProjectsGbrgroupcoImport
      parentRoute: typeof rootRoute
    }
    '/projects/pacemates-runclub': {
      id: '/projects/pacemates-runclub'
      path: '/projects/pacemates-runclub'
      fullPath: '/projects/pacemates-runclub'
      preLoaderRoute: typeof ProjectsPacematesRunclubImport
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
    '/projects/': {
      id: '/projects/'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/uses': typeof UsesLazyRoute
  '/projects/$slug': typeof ProjectsSlugRoute
  '/projects/gbrgroupco': typeof ProjectsGbrgroupcoRoute
  '/projects/pacemates-runclub': typeof ProjectsPacematesRunclubRoute
  '/books': typeof BooksIndexRoute
  '/gears': typeof GearsIndexRoute
  '/projects': typeof ProjectsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/uses': typeof UsesLazyRoute
  '/projects/$slug': typeof ProjectsSlugRoute
  '/projects/gbrgroupco': typeof ProjectsGbrgroupcoRoute
  '/projects/pacemates-runclub': typeof ProjectsPacematesRunclubRoute
  '/books': typeof BooksIndexRoute
  '/gears': typeof GearsIndexRoute
  '/projects': typeof ProjectsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/uses': typeof UsesLazyRoute
  '/projects/$slug': typeof ProjectsSlugRoute
  '/projects/gbrgroupco': typeof ProjectsGbrgroupcoRoute
  '/projects/pacemates-runclub': typeof ProjectsPacematesRunclubRoute
  '/books/': typeof BooksIndexRoute
  '/gears/': typeof GearsIndexRoute
  '/projects/': typeof ProjectsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/uses'
    | '/projects/$slug'
    | '/projects/gbrgroupco'
    | '/projects/pacemates-runclub'
    | '/books'
    | '/gears'
    | '/projects'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/uses'
    | '/projects/$slug'
    | '/projects/gbrgroupco'
    | '/projects/pacemates-runclub'
    | '/books'
    | '/gears'
    | '/projects'
  id:
    | '__root__'
    | '/'
    | '/uses'
    | '/projects/$slug'
    | '/projects/gbrgroupco'
    | '/projects/pacemates-runclub'
    | '/books/'
    | '/gears/'
    | '/projects/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  UsesLazyRoute: typeof UsesLazyRoute
  ProjectsSlugRoute: typeof ProjectsSlugRoute
  ProjectsGbrgroupcoRoute: typeof ProjectsGbrgroupcoRoute
  ProjectsPacematesRunclubRoute: typeof ProjectsPacematesRunclubRoute
  BooksIndexRoute: typeof BooksIndexRoute
  GearsIndexRoute: typeof GearsIndexRoute
  ProjectsIndexRoute: typeof ProjectsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  UsesLazyRoute: UsesLazyRoute,
  ProjectsSlugRoute: ProjectsSlugRoute,
  ProjectsGbrgroupcoRoute: ProjectsGbrgroupcoRoute,
  ProjectsPacematesRunclubRoute: ProjectsPacematesRunclubRoute,
  BooksIndexRoute: BooksIndexRoute,
  GearsIndexRoute: GearsIndexRoute,
  ProjectsIndexRoute: ProjectsIndexRoute,
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
        "/projects/$slug",
        "/projects/gbrgroupco",
        "/projects/pacemates-runclub",
        "/books/",
        "/gears/",
        "/projects/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/uses": {
      "filePath": "uses.lazy.tsx"
    },
    "/projects/$slug": {
      "filePath": "projects/$slug.tsx"
    },
    "/projects/gbrgroupco": {
      "filePath": "projects/gbrgroupco.tsx"
    },
    "/projects/pacemates-runclub": {
      "filePath": "projects/pacemates-runclub.tsx"
    },
    "/books/": {
      "filePath": "books/index.tsx"
    },
    "/gears/": {
      "filePath": "gears/index.tsx"
    },
    "/projects/": {
      "filePath": "projects/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
