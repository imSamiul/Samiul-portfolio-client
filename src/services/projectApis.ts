import axios from "axios";
import Cookies from "js-cookie";

import { getErrorMessage } from "../utils/errorHandler";
import { ApiResponse } from "../types/apiType";
import { ProjectType } from "../types/ProjectType";

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/project`;

const defaultOptions = {
  baseURL: apiUrl,
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = Cookies.get("token");
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

// GET: every project, drafts included. Authenticated, unlike `/getAllProjects`,
// which the public site uses and which hides drafts.
export async function getAllProjectsForDashboard() {
  try {
    const response = await instance.get<ApiResponse<ProjectType[]>>(
      "/getAllProjectsForDashboard",
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// POST:create new project
export async function createNewProject(formData: FormData) {
  try {
    const response = await instance.post<ApiResponse<ProjectType>>(
      "/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH: update showOnHomePage
export async function updateShowOnHomePage(projectId: string) {
  try {
    const response = await instance.patch<ApiResponse<ProjectType>>(
      `/updateShowOnHomePage/${projectId}`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH: flip draft <-> published
export async function updateStatus(projectId: string) {
  try {
    const response = await instance.patch<ApiResponse<ProjectType>>(
      `/updateStatus/${projectId}`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH: update project
export async function updateProject(projectId: string, formData: ProjectType) {
  try {
    const response = await instance.patch<ApiResponse<ProjectType>>(
      `/updateProject/${projectId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// DELETE: delete project
export async function deleteProject(projectId: string) {
  try {
    const response = await instance.delete<ApiResponse<null>>(
      `/deleteProject/${projectId}`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
