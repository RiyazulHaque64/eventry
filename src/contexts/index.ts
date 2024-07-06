import { createContext } from "react";

export interface AuthState {
  bio: string | null;
  email: string | null;
  id: string | null;
  name: string | null;
  phone: string | null;
}

export interface AuthContextValue {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);
