import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

import { router } from "../main";

export type AuthContextType = {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!Cookies.get("token")
  );

  const login = (token: string) => {
    Cookies.set("token", token, { expires: 7 });

    setIsAuthenticated(true);
    router.invalidate();
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    router.invalidate();
  };

  useEffect(() => {
    setIsAuthenticated(!!Cookies.get("token"));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
