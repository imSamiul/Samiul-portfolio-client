import axios from "axios";
import Cookies from "js-cookie";

import { ApiResponse } from "../types/apiType";
import { getErrorMessage } from "../utils/errorHandler";

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/resume`;

/**
 * Downloading needs no JavaScript: the endpoint answers 302 to a Cloudinary URL
 * that already carries `Content-Disposition: attachment`, so a plain anchor is
 * enough and the browser handles the save itself.
 */
export const RESUME_DOWNLOAD_URL = `${apiUrl}/download`;

const instance = axios.create({ baseURL: apiUrl });

instance.interceptors.request.use((config) => {
  const TOKEN = Cookies.get("token");
  if (TOKEN) {
    config.headers.Authorization = `Bearer ${TOKEN}`;
  }
  return config;
});

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("resume", file);

  try {
    const response = await instance.post<ApiResponse<{ updatedAt: string }>>(
      "/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
