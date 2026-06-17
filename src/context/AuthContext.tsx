"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  userName: string;
  userEmail: string;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null; needsVerification?: boolean }>;
  register: (email: string, password: string, seudonimo: string, nombre: string, apellidos: string, cedula: string) => Promise<{ error: string | null }>;
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isAdmin: false,
  isVerified: false,
  userName: "",
  userEmail: "",
  user: null,
  loading: true,
  login: async () => ({ error: null }),
  register: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null }),
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadProfile(u.id);
      } else {
        setUserName("");
        setIsAdmin(false);
        setIsVerified(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("seudonimo, is_admin, is_verified")
      .eq("id", userId)
      .single();

    if (data) {
      setUserName(data.seudonimo || "");
      setIsAdmin(data.is_admin || false);
      setIsVerified(data.is_verified || false);
    }
  }

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };

    if (data.user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("is_verified, is_admin")
        .eq("id", data.user.id)
        .single();

      if (profile && !profile.is_verified && !profile.is_admin) {
        await supabase.auth.signOut();
        setUser(null);
        return { error: null, needsVerification: true };
      }
    }

    return { error: null };
  };

  const register = async (email: string, password: string, seudonimo: string, nombre: string, apellidos: string, cedula: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { seudonimo, nombre, apellidos, cedula },
      },
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const verifyOtp = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) return { error: error.message };
    // Sign out after verification — they still need admin approval
    await supabase.auth.signOut();
    setUser(null);
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserName("");
    setIsAdmin(false);
    setIsVerified(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        isAdmin,
        isVerified,
        userName,
        userEmail: user?.email || "",
        user,
        loading,
        login,
        register,
        verifyOtp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
