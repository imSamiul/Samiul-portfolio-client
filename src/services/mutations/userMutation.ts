import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { LoginFormType } from "../../types/userType";
import { loginUser } from "../userApis";

import { useAuth } from "../../hooks/useAuth";

//Login User
export function useLoginUser() {
  const { login } = useAuth();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (userLoginObj: LoginFormType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      login(data.token);
      navigate({ to: "/" });
    },
  });
}
