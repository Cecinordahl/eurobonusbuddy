import { createContext } from "react";
import type { MonthData, QualificationPeriod } from "./trackerTypes";

export type TrackerState = {
    periods: QualificationPeriod[];
    periodsLoading: boolean;
    addPeriod: (input: { startMonth: string; endMonth: string }) => Promise<void>;
    removePeriod: (id: string) => Promise<void>;

    monthsByPeriod: Record<string, Record<string, MonthData>>;
    upsertMonth: (periodId: string, month: string, patch: Partial<Omit<MonthData, "month">>) => Promise<void>;
};

export const TrackerCtx = createContext<TrackerState | null>(null);
