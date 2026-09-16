import { z } from 'zod';

import {
  paginatedProjectsSchema,
  projectDetailSchema,
  projectSummaryListSchema,
  type UpdateProjectPayload,
} from '@/shared';

import { axiosInstance } from './axiosInstance';
import { request } from '../utils/apiHelper';

export const projectApis = {
  // GET: one page of the public list, drafts hidden. The projects route renders
  // page one on the server, so this only ever fetches page two onwards.
  listPage: ({ page, limit }: { page: number; limit: number }) =>
    request(paginatedProjectsSchema, () =>
      axiosInstance.get('/project/getAllProjects', { params: { page, limit } }),
    ),

  // GET: every project, drafts included. Authenticated, unlike `/getAllProjects`,
  // which the public site uses and which hides drafts.
  getAllForDashboard: () =>
    request(projectSummaryListSchema, () =>
      axiosInstance.get('/project/getAllProjectsForDashboard'),
    ),

  // POST: create a new project
  create: (formData: FormData) =>
    request(projectDetailSchema, () =>
      axiosInstance.post('/project/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    ),

  // PATCH: flip the homepage display flag
  toggleHomepage: (projectId: string) =>
    request(projectDetailSchema, () =>
      axiosInstance.patch(`/project/updateShowOnHomePage/${projectId}`),
    ),

  // PATCH: flip draft <-> published
  toggleStatus: (projectId: string) =>
    request(projectDetailSchema, () =>
      axiosInstance.patch(`/project/updateStatus/${projectId}`),
    ),

  // PATCH: update a project. JSON, so the tech lists are real arrays here.
  update: ({
    projectId,
    payload,
  }: {
    projectId: string;
    payload: UpdateProjectPayload;
  }) =>
    request(projectDetailSchema, () =>
      axiosInstance.patch(`/project/updateProject/${projectId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      }),
    ),

  // DELETE: remove a project
  remove: (projectId: string) =>
    request(z.null(), () =>
      axiosInstance.delete(`/project/deleteProject/${projectId}`),
    ),
};
