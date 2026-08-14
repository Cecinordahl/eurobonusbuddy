import { Routes, Route, Navigate } from "react-router-dom";
import PlannerPage from "../pages/PlannerPage";
import MethodsPage from "../pages/MethodsPage";
import ComparePage from "../pages/ComparePage";
import RulesPage from "../pages/RulesPage";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<PlannerPage />} />
            <Route path="/methods" element={<MethodsPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
