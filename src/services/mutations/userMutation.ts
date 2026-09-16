import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormType } from "../../types/userType";
import { loginUser } from "../userApis";

import { useAuth } from "../../hooks/useAuth";

//Login User
export function useLoginUser() {
  const { login } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationFn: (userLoginObj: LoginFormType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      login(data.token);
      router.push("/");
    },
  });
}
