export type StatusTier = "SILVER" | "GOLD" | "DIAMOND";

export const STATUS_TIERS: Record<StatusTier, { label: string; threshold: number }> = {
    SILVER: { label: "Sølv", threshold: 20_000 },
    GOLD: { label: "Gull", threshold: 45_000 },
    DIAMOND: { label: "Diamant", threshold: 90_000 },
};
