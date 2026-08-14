import { createContext } from "react";
import type { Plan } from "./planEngineTypes";
import type { PlannerInput } from "./plannerTypes";

export type PlannerState = {
    input: PlannerInput;
    setInput: (next: PlannerInput) => void;

    targetThreshold: number;
    remainingPoints: number;

    plans: Plan[];
    generate: () => void;
};

export const PlannerCtx = createContext<PlannerState | null>(null);
