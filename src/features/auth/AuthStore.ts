import { createContext } from "react";
import type { User } from "firebase/auth";

export type AuthState = {
    user: User | null;
    loading: boolean;
    isAllowed: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
};

export const AuthCtx = createContext<AuthState | null>(null);
