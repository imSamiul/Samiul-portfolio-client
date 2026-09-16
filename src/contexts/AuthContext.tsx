"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Cookies are unreadable while rendering on the server, so the real auth
  // state has to be picked up after mount to keep the markup hydration-safe.
  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("token"));
  }, []);

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 7 });
    setIsAuthenticated(true);
    router.refresh();
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.refresh();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
