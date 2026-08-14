import { AppLayout } from "./layout/AppLayout";
import { AppRoutes } from "./routes";
import { PlannerProvider } from "../features/planner/PlannerProvider.tsx";

export default function App() {
    return (
        <PlannerProvider>
            <AppLayout>
                <AppRoutes />
            </AppLayout>
        </PlannerProvider>
    );
}
