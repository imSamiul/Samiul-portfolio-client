import axios from "axios";
import { getAuthToken } from "../utils/auth";

import { getErrorMessage } from "../utils/errorHandler";

const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/project`;

const defaultOptions = {
  baseURL: apiUrl,
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use((config) => {
  const TOKEN = getAuthToken();
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
