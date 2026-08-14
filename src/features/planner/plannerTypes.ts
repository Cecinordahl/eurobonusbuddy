import type { StatusTier } from "../../data/statusTiers";
import type { Currency } from "../../domain/currency";
import { DEFAULT_CURRENCY } from "../../domain/currency";

export type OptimizeFor = "FASTEST" | "CHEAPEST";

export type PlannerInput = {
    currentPoints: number;
    target: StatusTier;
    monthsElapsed: number;
    monthsRemaining: number;
    optimizeFor: OptimizeFor;
    currency: Currency;
};

export const DEFAULT_PLANNER_INPUT: PlannerInput = {
    currentPoints: 0,
    target: "SILVER",
    monthsElapsed: 0,
    monthsRemaining: 12,
    optimizeFor: "FASTEST",
    currency: DEFAULT_CURRENCY,
};
