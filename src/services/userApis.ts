import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

import { getErrorMessage } from "../utils/errorHandler";
import { LoginFormType } from "../types/userType";

const defaultOptions = {
  baseURL: `${baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

// POST: login user
export async function loginUser(userLoginObj: LoginFormType) {
  try {
    const response = await instance.post(`/auth/login`, userLoginObj);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
