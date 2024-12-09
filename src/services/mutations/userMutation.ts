import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LoginFormType } from "../../types/userType";
import { loginUser } from "../userApis";
import { setAuthToken } from "../../utils/auth";

//Login User
export function useLoginUser() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: LoginFormType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      setAuthToken(data.token);
      navigate({ to: "/" });
    },
  });
}
