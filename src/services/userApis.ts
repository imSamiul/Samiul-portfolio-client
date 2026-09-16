import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

import { getErrorMessage } from "../utils/errorHandler";
import { ApiResponse } from "../types/apiType";
import { LoginFormType, UserType } from "../types/userType";

const defaultOptions = {
  baseURL: `${baseURL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

// POST: login user
export async function loginUser(userLoginObj: LoginFormType) {
  try {
    const response = await instance.post<
      ApiResponse<{ user: UserType; token: string }>
    >(`/auth/login`, userLoginObj);
    return response.data.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
