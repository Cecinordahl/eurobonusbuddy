import type { PlanAction } from "../planEngineTypes";

export const CAR_RENTAL_OPTIONS: Array<{ range: "1-6" | "7-27" | "28+"; points: number }> = [
    { range: "1-6", points: 1000 },
    { range: "7-27", points: 1500 },
    { range: "28+", points: 2000 },
];

export function carRentalAction(range: "1-6" | "7-27" | "28+"): PlanAction {
    const points = CAR_RENTAL_OPTIONS.find((x) => x.range === range)!.points;

    return {
        type: "CAR_RENTAL",
        rentalDaysRange: range,
        points,
        estimatedCostSEK: null,
        speed: "UNKNOWN",
        notes: ["Fixed Level Points per rental length tier.", "We’ll add cost modeling later (Phase 3.x)."],
    };
}
