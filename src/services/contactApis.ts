import axios from "axios";

import { ApiResponse } from "../types/apiType";
import { ContactFormValues } from "../types/contactType";
import { getErrorMessage } from "../utils/errorHandler";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendContactMessage(message: ContactFormValues) {
  try {
    await axios.post<ApiResponse<null>>(
      `${baseURL}/api/v1/contact`,
      message,
    );
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
