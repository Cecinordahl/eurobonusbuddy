import type { PlanAction, PlanContext } from "../planEngineTypes";
import type { StatusTier } from "../../../data/statusTiers";

const BUY_BLOCK_SIZE = 100;

const MAX_BUY: Record<StatusTier, number> = {
    SILVER: 5_000,
    GOLD: 15_000,
    DIAMOND: 30_000,
};

// From SAS EuroBonus Shop: must have earned during the qualifying period:
const MIN_EARNED_TO_BUY: Record<StatusTier, number> = {
    SILVER: 15_000,
    GOLD: 30_000,
    DIAMOND: 60_000,
};

// From SAS EuroBonus Shop: 1,000 Level Points = 1,000 SEK (or 10,000 Bonus Points)
const SEK_PER_1000 = 1000;

export function buyLevelPointsAction(ctx: PlanContext): { action: PlanAction | null; warnings: string[] } {
    const warnings: string[] = [];

    if (ctx.gap <= 0) return { action: null, warnings };

    // Eligibility (official rules)
    if (ctx.monthsElapsed < 6) {
        warnings.push("Not eligible to buy Level Points until you are at least 6 months into your qualification period.");
        return { action: null, warnings };
    }

    const minEarned = MIN_EARNED_TO_BUY[ctx.target];
    if (ctx.currentPoints < minEarned) {
        warnings.push(
            `Not eligible to buy Level Points towards ${ctx.target}: you must have earned at least ${minEarned.toLocaleString()} Level Points in the qualification period.`
        );
        return { action: null, warnings };
    }

    // Allowed to buy up to cap AND only what you need to reach target
    const rawNeeded = Math.min(ctx.gap, MAX_BUY[ctx.target]);

    // Buy in blocks of 100
    const blocks = Math.floor(rawNeeded / BUY_BLOCK_SIZE);
    const points = blocks * BUY_BLOCK_SIZE;

    if (points <= 0) {
        warnings.push("Gap is smaller than the minimum purchase block (100 points).");
        return { action: null, warnings };
    }

    const estimatedCostSEK = Math.ceil(points / 1000) * SEK_PER_1000; // simple rounding to 1000-point pricing buckets

    const action: PlanAction = {
        type: "BUY_LEVEL_POINTS",
        points,
        estimatedCostSEK,
        speed: "WITHIN_24H",
        notes: [
            "Buy in blocks of 100 Level Points.",
            "Posting can take up to 24 hours (per SAS EuroBonus Shop support).",
            "Max purchase depends on target tier (5k/15k/30k).",
        ],
    };

    return { action, warnings };
}
