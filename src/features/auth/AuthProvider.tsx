import { type ReactNode, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut as firebaseSignOut, type User } from "firebase/auth";
import { auth, googleProvider } from "../../lib/firebase";
import { ALLOWED_EMAILS } from "./allowedEmails";
import { AuthCtx } from "./AuthStore";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    const isAllowed = !!user?.email && ALLOWED_EMAILS.includes(user.email);

    const value = useMemo(
        () => ({
            user,
            loading,
            isAllowed,
            signIn: async () => {
                await signInWithPopup(auth, googleProvider);
            },
            signOut: async () => {
                await firebaseSignOut(auth);
            },
        }),
        [user, loading, isAllowed]
    );

    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
