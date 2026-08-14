import { NavLink } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";

export function NavBar() {
    const { user } = useAuth();

    return (
        <header className="navbar">
            <div className="container navbar-inner">
                <div className="brand">SAS Status Planner</div>
                <nav className="navlinks">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                        Planner
                    </NavLink>
                    <NavLink to="/methods" className={({ isActive }) => (isActive ? "active" : "")}>
                        Methods
                    </NavLink>
                    <NavLink to="/compare" className={({ isActive }) => (isActive ? "active" : "")}>
                        Compare
                    </NavLink>
                    <NavLink to="/rules" className={({ isActive }) => (isActive ? "active" : "")}>
                        Rules
                    </NavLink>
                    {user && (
                        <NavLink to="/tracker" className={({ isActive }) => (isActive ? "active" : "")}>
                            Tracker
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}
