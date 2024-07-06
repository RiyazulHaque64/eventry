"use client";

import { AuthContext, AuthState } from "@/contexts";
import { ReactNode, useState } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    bio: null,
    email: null,
    id: null,
    name: null,
    phone: null,
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
