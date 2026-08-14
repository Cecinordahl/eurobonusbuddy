import {type ReactNode, useCallback, useMemo, useState } from "react";
import { STATUS_TIERS } from "../../data/statusTiers";
import { generatePlans } from "./planEngine";
import type { Plan } from "./planEngineTypes";
import { PlannerCtx } from "./PlannerStore";
import { DEFAULT_PLANNER_INPUT, type PlannerInput } from "./plannerTypes";

export function PlannerProvider({ children }: { children: ReactNode }) {
    const [input, setInput] = useState<PlannerInput>(DEFAULT_PLANNER_INPUT);
    const [plans, setPlans] = useState<Plan[]>([]);

    const targetThreshold = STATUS_TIERS[input.target].threshold;
    const remainingPoints = Math.max(0, targetThreshold - Math.max(0, input.currentPoints));

    const generate = useCallback(() => {
        const p = generatePlans(input, targetThreshold, input.optimizeFor);
        setPlans(p);
    }, [input, targetThreshold]);

    const value = useMemo(
        () => ({
            input,
            setInput,
            targetThreshold,
            remainingPoints,
            plans,
            generate,
        }),
        [input, targetThreshold, remainingPoints, plans, generate]
    );

    return <PlannerCtx.Provider value={value}>{children}</PlannerCtx.Provider>;
}
