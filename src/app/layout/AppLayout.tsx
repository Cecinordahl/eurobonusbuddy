import type {ReactNode} from "react";
import { NavBar } from "./NavBar";

export function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="app">
            <NavBar />
            <main className="container">{children}</main>
        </div>
    );
}
