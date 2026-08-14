import type { ReactNode } from "react";
import { useAuth } from "./useAuth";

export function RequireAuth({ children }: { children: ReactNode }) {
    const { user, loading, isAllowed, signIn, signOut } = useAuth();

    if (loading) {
        return (
            <div className="stack">
                <p className="muted">Loading…</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="stack">
                <h1>Tracker</h1>
                <section className="card stack">
                    <p className="muted">Sign in to view your points tracker.</p>
                    <button onClick={() => void signIn()}>Sign in with Google</button>
                </section>
            </div>
        );
    }

    if (!isAllowed) {
        return (
            <div className="stack">
                <h1>Tracker</h1>
                <section className="card stack">
                    <p className="muted">
                        {user.email} isn't allowed to access this beta feature.
                    </p>
                    <button className="secondary" onClick={() => void signOut()}>
                        Sign out
                    </button>
                </section>
            </div>
        );
    }

    return <>{children}</>;
}
