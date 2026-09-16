import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginFormType } from "../../types/userType";
import { loginUser } from "../userApis";

import { useAuth } from "../../hooks/useAuth";

//Login User
export function useLoginUser(destination: string) {
  const { login } = useAuth();
  const router = useRouter();
  return useMutation({
    mutationFn: (userLoginObj: LoginFormType) => loginUser(userLoginObj),
    onSuccess: (data) => {
      // login() writes the cookie synchronously, so the guard already sees it
      // by the time this navigation is handled.
      login(data.token);
      router.push(destination);
    },
  });
}
