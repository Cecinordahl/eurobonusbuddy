import { useEffect, useRef, useState } from "react";
import { PersonIcon } from "./icons";
import { useAuth } from "./useAuth";

export function AccountMenu() {
    const { user, loading, isAllowed, signIn, signOut } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    if (loading) return null;

    if (!user) {
        return (
            <button
                className="icon-button secondary"
                aria-label="Sign in with Google"
                title="Sign in with Google"
                onClick={() => void signIn()}
            >
                <PersonIcon />
            </button>
        );
    }

    return (
        <div className="account-menu" ref={menuRef}>
            <button
                className={`icon-button secondary ${isAllowed ? "accent" : ""}`}
                aria-label="Account menu"
                title={user.email ?? "Account"}
                onClick={() => setOpen((o) => !o)}
            >
                <PersonIcon />
            </button>
            {open && (
                <div className="account-menu-panel card stack">
                    <span className="muted" style={{ fontSize: 13, wordBreak: "break-all" }}>
                        {user.email}
                    </span>
                    {!isAllowed && (
                        <span className="muted" style={{ fontSize: 12 }}>
                            Not authorized for the beta.
                        </span>
                    )}
                    <button
                        className="secondary"
                        onClick={() => {
                            setOpen(false);
                            void signOut();
                        }}
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
