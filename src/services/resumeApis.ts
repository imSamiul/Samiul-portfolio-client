import axios from "axios";
import { getErrorMessage } from "../utils/errorHandler";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function getResume() {
  try {
    const response = await axios({
      url: `${baseURL}/api/resume/download`,
      responseType: "blob",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
