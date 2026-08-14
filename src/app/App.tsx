import { AppLayout } from "./layout/AppLayout";
import { AppRoutes } from "./routes";
import { PlannerProvider } from "../features/planner/PlannerProvider.tsx";
import { AuthProvider } from "../features/auth/AuthProvider";

export default function App() {
    return (
        <AuthProvider>
            <PlannerProvider>
                <AppLayout>
                    <AppRoutes />
                </AppLayout>
            </PlannerProvider>
        </AuthProvider>
    );
}
