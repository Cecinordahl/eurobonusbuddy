import { useContext } from "react";
import { AuthCtx } from "./AuthStore";

export function useAuth() {
    const v = useContext(AuthCtx);
    if (!v) throw new Error("useAuth must be used within AuthProvider");
    return v;
}
