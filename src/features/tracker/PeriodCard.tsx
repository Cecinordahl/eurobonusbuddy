import { useState } from "react";
import { STATUS_TIERS } from "../../data/statusTiers";
import { TrashIcon } from "./icons";
import { MonthCard } from "./MonthCard";
import { formatMonthShort, monthsInRange } from "./monthRange";
import { monthTotal } from "./monthTotal";
import type { MonthData, QualificationPeriod } from "./trackerTypes";

function formatThreshold(n: number): string {
    return `${Math.round(n / 1000)}k`;
}

export function PeriodCard({
    period,
    months,
    monthsLoading,
    onSaveMonth,
    onDelete,
}: {
    period: QualificationPeriod;
    months: Record<string, MonthData>;
    monthsLoading: boolean;
    onSaveMonth: (month: string, patch: Partial<Omit<MonthData, "month">>) => void;
    onDelete: () => void;
}) {
    const [expanded, setExpanded] = useState(false);

    const monthList = monthsInRange(period.startMonth, period.endMonth);
    const loggedCount = monthList.filter((m) => monthTotal(months[m]) > 0).length;
    const totalPoints = monthList.reduce((sum, m) => sum + monthTotal(months[m]), 0);
    const progressPct = monthList.length === 0 ? 0 : (loggedCount / monthList.length) * 100;

    const tiers = Object.values(STATUS_TIERS);
    const nextTier = tiers.find((t) => totalPoints < t.threshold) ?? tiers[tiers.length - 1];

    return (
        <section className="card stack period-card">
            <div className="row space-between">
                <div className="row" style={{ gap: 10 }}>
                    <svg
                        className="accent"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={period.isDefault ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                    >
                        <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.8 5.5 21 7.5 13.5 2 9 9 9" />
                    </svg>
                    <strong style={{ fontSize: "1.25rem" }}>{period.label}</strong>
                </div>
                <button
                    className="icon-button secondary"
                    aria-label={`Delete ${period.label}`}
                    title={`Delete ${period.label}`}
                    onClick={onDelete}
                >
                    <TrashIcon />
                </button>
            </div>

            <p className="muted">
                {loggedCount} of {monthList.length} months logged · {totalPoints.toLocaleString()} qualifying points
            </p>

            <div className="timeline">
                <div className="timeline-track">
                    <div className="timeline-progress" style={{ width: `${progressPct}%` }} />
                    <div className="timeline-marker accent" style={{ left: `${progressPct}%` }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="6" />
                        </svg>
                    </div>
                </div>
                <div className="timeline-dots">
                    {monthList.map((m) => (
                        <div key={m} className="timeline-dot-col">
                            <span className={`timeline-dot ${monthTotal(months[m]) > 0 ? "filled" : ""}`} />
                            <span className="timeline-dot-label muted">{formatMonthShort(m).split(" ")[0]}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row space-between tier-row">
                {tiers.map((t) => (
                    <span key={t.label} className={t === nextTier ? "tier-active" : "muted"}>
                        {t.label} <strong>{formatThreshold(t.threshold)}</strong>
                    </span>
                ))}
            </div>

            <button className="secondary details-toggle" onClick={() => setExpanded((e) => !e)}>
                {expanded ? "Hide monthly details" : "View monthly details"}
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: expanded ? "rotate(180deg)" : "none" }}
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {expanded && (
                <div className="stack">
                    {monthsLoading && <p className="muted">Loading months…</p>}
                    {!monthsLoading &&
                        monthList.map((month) => (
                            <MonthCard
                                key={month}
                                month={month}
                                data={months[month]}
                                onSave={(patch) => onSaveMonth(month, patch)}
                            />
                        ))}
                </div>
            )}
        </section>
    );
}
