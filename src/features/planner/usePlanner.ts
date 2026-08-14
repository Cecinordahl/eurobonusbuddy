import { useContext } from "react";
import { PlannerCtx } from "./PlannerStore";

export function usePlanner() {
    const v = useContext(PlannerCtx);
    if (!v) throw new Error("usePlanner must be used within PlannerProvider");
    return v;
}
