import type { StatusTier } from "../../data/statusTiers";

export type TimelineSpeed = "INSTANT" | "WITHIN_24H" | "UNKNOWN";

export type PlanAction =
    | {
    type: "BUY_LEVEL_POINTS";
    points: number;
    estimatedCostSEK: number; // keep source currency
    speed: "WITHIN_24H";
    notes: string[];
}
    | {
    type: "CAR_RENTAL";
    rentalDaysRange: "1-6" | "7-27" | "28+";
    points: number;
    estimatedCostSEK: null; // unknown until we model it
    speed: "UNKNOWN";
    notes: string[];
};

export type Plan = {
    id: string;
    title: string;
    totalPoints: number;
    estimatedCostSEK: number | null; // null if any action has unknown cost
    speed: TimelineSpeed; // simplified for Phase 3 start
    actions: PlanAction[];
    warnings: string[];
    coversGap: boolean;
};

export type PlanContext = {
    currentPoints: number;
    target: StatusTier;
    targetThreshold: number;
    gap: number;
    // derived assumption: qualification period is 12 months
    monthsRemaining: number;
    monthsElapsed: number;
};
