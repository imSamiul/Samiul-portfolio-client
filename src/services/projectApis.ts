import axios from "axios";
import Cookies from "js-cookie";

import { getErrorMessage } from "../utils/errorHandler";
import { ProjectType } from "../types/ProjectType";

const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/project`;

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

// GET: get all projects
export async function getAllProjects() {
  try {
    const response = await instance.get("/getAllProjects");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// GET: get project by id
export async function getProjectById(projectId: string) {
  try {
    const response = await instance.get(`/getProjectById/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
// GET: get projects for homepage
export async function getProjectsForHomepage() {
  try {
    const response = await instance.get("/getProjectsForHomepage");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// POST:create new project
export async function createNewProject(formData: FormData) {
  try {
    const response = await instance.post("/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH: update showOnHomePage
export async function updateShowOnHomePage(projectId: string) {
  try {
    const response = await instance.patch(`/updateShowOnHomePage/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// PATCH: update project
export async function updateProject(projectId: string, formData: ProjectType) {
  try {
    const response = await instance.patch(
      `/updateProject/${projectId}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

// DELETE: delete project
export async function deleteProject(projectId: string) {
  try {
    const response = await instance.delete(`/deleteProject/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
