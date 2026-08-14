import type { OptimizeFor, PlannerInput } from "./plannerTypes";
import type { Plan, PlanAction, PlanContext } from "./planEngineTypes";
import { buyLevelPointsAction } from "./generators/buyLevelPoints";
import { carRentalAction, CAR_RENTAL_OPTIONS } from "./generators/carRental";

function speedRank(speed: Plan["speed"]) {
    // Lower is better
    if (speed === "INSTANT") return 0;
    if (speed === "WITHIN_24H") return 1;
    return 9;
}

function computePlanMeta(actions: PlanAction[]) {
    const totalPoints = actions.reduce((s, a) => s + a.points, 0);

    const anyUnknownCost = actions.some((a) => a.estimatedCostSEK === null);
    const estimatedCostSEK = anyUnknownCost ? null : actions.reduce((s, a) => s + (a.estimatedCostSEK ?? 0), 0);

    const speed: Plan["speed"] = actions.some((a) => a.speed === "UNKNOWN")
        ? "UNKNOWN"
        : actions.some((a) => a.speed === "WITHIN_24H")
            ? "WITHIN_24H"
            : "INSTANT";

    return { totalPoints, estimatedCostSEK, speed };
}

export function generatePlans(input: PlannerInput, targetThreshold: number, optimizeFor: OptimizeFor): Plan[] {
    const monthsElapsed = Math.max(0, input.monthsElapsed);
    const gap = Math.max(0, targetThreshold - Math.max(0, input.currentPoints));

    const ctx: PlanContext = {
        currentPoints: Math.max(0, input.currentPoints),
        target: input.target,
        targetThreshold,
        gap,
        monthsRemaining: input.monthsRemaining,
        monthsElapsed,
    };

    const plans: Plan[] = [];

    // Plan 1: Buy points (if eligible)
    const buy = buyLevelPointsAction(ctx);
    if (buy.action) {
        const actions = [buy.action];
        const meta = computePlanMeta(actions);

        plans.push({
            id: "buy-only",
            title: "Buy Level Points (fastest if eligible)",
            ...meta,
            actions,
            warnings: buy.warnings,
            coversGap: meta.totalPoints >= gap,
        });
    } else {
        plans.push({
            id: "buy-only-ineligible",
            title: "Buy Level Points (not currently eligible)",
            totalPoints: 0,
            estimatedCostSEK: 0,
            speed: "WITHIN_24H",
            actions: [],
            warnings: buy.warnings.length ? buy.warnings : ["Not eligible based on current inputs."],
            coversGap: false,
        });
    }

    // Plan 2..n: Car rental bundles (we generate a few “N rentals” suggestions)
    // We’ll keep it simple: suggest 1, 3, 5 rentals using the best points/rental tier (28+).
    const bestTier = CAR_RENTAL_OPTIONS[CAR_RENTAL_OPTIONS.length - 1]; // 28+ -> 2000
    [1, 3, 5].forEach((count) => {
        const actions = Array.from({ length: count }, () => carRentalAction(bestTier.range));
        const meta = computePlanMeta(actions);

        plans.push({
            id: `rental-${count}`,
            title: `${count} × car rental (${bestTier.range} days)`,
            ...meta,
            actions,
            warnings: ["Rental costs not modeled yet; cost-based ranking will improve once you add assumptions."],
            coversGap: meta.totalPoints >= gap,
        });
    });

    // Plan: Hybrid — buy (if possible) + top-up with rentals to cover the rest
    if (buy.action) {
        const remainingAfterBuy = Math.max(0, gap - buy.action.points);

        if (remainingAfterBuy > 0) {
            const rentalsNeeded = Math.ceil(remainingAfterBuy / bestTier.points);
            const rentalActions = Array.from({ length: rentalsNeeded }, () => carRentalAction(bestTier.range));

            const actions = [buy.action, ...rentalActions];
            const meta = computePlanMeta(actions);

            plans.push({
                id: "hybrid-buy-rentals",
                title: "Hybrid: Buy points + car rentals to reach target",
                ...meta,
                actions,
                warnings: [
                    ...buy.warnings,
                    "Car rental costs not modeled yet; this plan may not be cheapest in reality.",
                ],
                coversGap: meta.totalPoints >= gap,
            });
        }
    }

    // Ranking
    const ranked = [...plans].sort((a, b) => {
        if (optimizeFor === "FASTEST") {
            const sr = speedRank(a.speed) - speedRank(b.speed);
            if (sr !== 0) return sr;

            // tie-breaker: fewer actions
            const ar = a.actions.length - b.actions.length;
            if (ar !== 0) return ar;

            // then lower known cost
            const ac = a.estimatedCostSEK ?? Number.POSITIVE_INFINITY;
            const bc = b.estimatedCostSEK ?? Number.POSITIVE_INFINITY;
            return ac - bc;
        }

        // CHEAPEST: prefer known lower cost; unknown cost last
        const ac = a.estimatedCostSEK ?? Number.POSITIVE_INFINITY;
        const bc = b.estimatedCostSEK ?? Number.POSITIVE_INFINITY;
        if (ac !== bc) return ac - bc;

        // tie-breaker: faster
        return speedRank(a.speed) - speedRank(b.speed);
    });

    return ranked;
}
