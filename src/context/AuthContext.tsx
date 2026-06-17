"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  login: (name: string) => void;
  loginAdmin: (password: string) => boolean;
  logout: () => void;
}

const ADMIN_PASSWORD = "chismecr2026";

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAdmin: false,
  userName: "",
  login: () => {},
  loginAdmin: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        userName,
        login: (name: string) => {
          setIsLoggedIn(true);
          setUserName(name);
        },
        loginAdmin: (password: string) => {
          if (password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setIsAdmin(true);
            setUserName("Admin");
            return true;
          }
          return false;
        },
        logout: () => {
          setIsLoggedIn(false);
          setIsAdmin(false);
          setUserName("");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
