import { PlannerForm } from "../features/planner/PlannerForm";
import { PlanResults } from "../features/planner/PlanResults";

export default function PlannerPage() {
    return (
        <div className="stack">
            <h1>Plan your fastest way to reach SAS status</h1>
            <p className="muted">
                Choose your target tier and optimization mode. We’ll generate plans based on known earning methods
                (cards, rentals, buying points rules, etc.).
            </p>
            <PlannerForm />
            <PlanResults />
        </div>
    );
}
