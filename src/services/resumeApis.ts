import axios from "axios";
import { getErrorMessage } from "../utils/errorHandler";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getResume() {
  try {
    const response = await axios({
      url: `${baseURL}/resume/download`,
      responseType: "blob",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
