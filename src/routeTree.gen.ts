/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ResumeImport } from './routes/resume'
import { Route as ProjectsImport } from './routes/projects'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as DashboardProjectListImport } from './routes/dashboard/projectList'
import { Route as DashboardAddProjectImport } from './routes/dashboard/addProject'
import { Route as DashboardEditProjectProjectIdImport } from './routes/dashboard/editProject/$projectId'

// Create/Update Routes

const ResumeRoute = ResumeImport.update({
  id: '/resume',
  path: '/resume',
  getParentRoute: () => rootRoute,
} as any)

const ProjectsRoute = ProjectsImport.update({
  id: '/projects',
  path: '/projects',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardProjectListRoute = DashboardProjectListImport.update({
  id: '/projectList',
  path: '/projectList',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAddProjectRoute = DashboardAddProjectImport.update({
  id: '/addProject',
  path: '/addProject',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardEditProjectProjectIdRoute =
  DashboardEditProjectProjectIdImport.update({
    id: '/editProject/$projectId',
    path: '/editProject/$projectId',
    getParentRoute: () => DashboardRoute,
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
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/projects': {
      id: '/projects'
      path: '/projects'
      fullPath: '/projects'
      preLoaderRoute: typeof ProjectsImport
      parentRoute: typeof rootRoute
    }
    '/resume': {
      id: '/resume'
      path: '/resume'
      fullPath: '/resume'
      preLoaderRoute: typeof ResumeImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/addProject': {
      id: '/dashboard/addProject'
      path: '/addProject'
      fullPath: '/dashboard/addProject'
      preLoaderRoute: typeof DashboardAddProjectImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/projectList': {
      id: '/dashboard/projectList'
      path: '/projectList'
      fullPath: '/dashboard/projectList'
      preLoaderRoute: typeof DashboardProjectListImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/editProject/$projectId': {
      id: '/dashboard/editProject/$projectId'
      path: '/editProject/$projectId'
      fullPath: '/dashboard/editProject/$projectId'
      preLoaderRoute: typeof DashboardEditProjectProjectIdImport
      parentRoute: typeof DashboardImport
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardAddProjectRoute: typeof DashboardAddProjectRoute
  DashboardProjectListRoute: typeof DashboardProjectListRoute
  DashboardEditProjectProjectIdRoute: typeof DashboardEditProjectProjectIdRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardAddProjectRoute: DashboardAddProjectRoute,
  DashboardProjectListRoute: DashboardProjectListRoute,
  DashboardEditProjectProjectIdRoute: DashboardEditProjectProjectIdRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof LoginRoute
  '/projects': typeof ProjectsRoute
  '/resume': typeof ResumeRoute
  '/dashboard/addProject': typeof DashboardAddProjectRoute
  '/dashboard/projectList': typeof DashboardProjectListRoute
  '/dashboard/editProject/$projectId': typeof DashboardEditProjectProjectIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof LoginRoute
  '/projects': typeof ProjectsRoute
  '/resume': typeof ResumeRoute
  '/dashboard/addProject': typeof DashboardAddProjectRoute
  '/dashboard/projectList': typeof DashboardProjectListRoute
  '/dashboard/editProject/$projectId': typeof DashboardEditProjectProjectIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/login': typeof LoginRoute
  '/projects': typeof ProjectsRoute
  '/resume': typeof ResumeRoute
  '/dashboard/addProject': typeof DashboardAddProjectRoute
  '/dashboard/projectList': typeof DashboardProjectListRoute
  '/dashboard/editProject/$projectId': typeof DashboardEditProjectProjectIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/dashboard'
    | '/login'
    | '/projects'
    | '/resume'
    | '/dashboard/addProject'
    | '/dashboard/projectList'
    | '/dashboard/editProject/$projectId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/dashboard'
    | '/login'
    | '/projects'
    | '/resume'
    | '/dashboard/addProject'
    | '/dashboard/projectList'
    | '/dashboard/editProject/$projectId'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/dashboard'
    | '/login'
    | '/projects'
    | '/resume'
    | '/dashboard/addProject'
    | '/dashboard/projectList'
    | '/dashboard/editProject/$projectId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  LoginRoute: typeof LoginRoute
  ProjectsRoute: typeof ProjectsRoute
  ResumeRoute: typeof ResumeRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  DashboardRoute: DashboardRouteWithChildren,
  LoginRoute: LoginRoute,
  ProjectsRoute: ProjectsRoute,
  ResumeRoute: ResumeRoute,
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
        "/about",
        "/dashboard",
        "/login",
        "/projects",
        "/resume"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/addProject",
        "/dashboard/projectList",
        "/dashboard/editProject/$projectId"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/projects": {
      "filePath": "projects.tsx"
    },
    "/resume": {
      "filePath": "resume.tsx"
    },
    "/dashboard/addProject": {
      "filePath": "dashboard/addProject.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/projectList": {
      "filePath": "dashboard/projectList.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/editProject/$projectId": {
      "filePath": "dashboard/editProject/$projectId.tsx",
      "parent": "/dashboard"
    }
  }
}
ROUTE_MANIFEST_END */
