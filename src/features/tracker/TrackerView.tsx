import { useState } from "react";
import { MonthYearSelect } from "./MonthYearSelect";
import { PeriodCard } from "./PeriodCard";
import { MAX_PERIODS } from "./trackerTypes";
import { useTracker } from "./useTracker";

export function TrackerView() {
    const { periods, periodsLoading, addPeriod, removePeriod, monthsByPeriod, upsertMonth } = useTracker();

    const [showAddPeriod, setShowAddPeriod] = useState(false);
    const [startMonthNum, setStartMonthNum] = useState("");
    const [startYear, setStartYear] = useState("");
    const [endMonthNum, setEndMonthNum] = useState("");
    const [endYear, setEndYear] = useState("");

    async function handleAddPeriod() {
        if (!startMonthNum || !startYear || !endMonthNum || !endYear) return;
        await addPeriod({
            startMonth: `${startYear}-${startMonthNum}`,
            endMonth: `${endYear}-${endMonthNum}`,
        });
        setStartMonthNum("");
        setStartYear("");
        setEndMonthNum("");
        setEndYear("");
        setShowAddPeriod(false);
    }

    if (periodsLoading) {
        return (
            <div className="stack">
                <h1>Tracker</h1>
                <p className="muted">Loading…</p>
            </div>
        );
    }

    return (
        <div className="stack">
            <h1>Tracker</h1>

            {periods.map((p) => (
                <PeriodCard
                    key={p.id}
                    period={p}
                    months={monthsByPeriod[p.id] ?? {}}
                    monthsLoading={!(p.id in monthsByPeriod)}
                    onSaveMonth={(month, patch) => void upsertMonth(p.id, month, patch)}
                    onDelete={() => void removePeriod(p.id)}
                />
            ))}

            {periods.length < MAX_PERIODS && !showAddPeriod && (
                <button className="add-period-button" onClick={() => setShowAddPeriod(true)}>
                    <span className="add-period-icon">+</span> Add period
                </button>
            )}

            {showAddPeriod && (
                <section className="card stack">
                    <div className="grid">
                        <MonthYearSelect
                            label="Start month"
                            month={startMonthNum}
                            year={startYear}
                            onMonthChange={setStartMonthNum}
                            onYearChange={setStartYear}
                        />
                        <MonthYearSelect
                            label="End month"
                            month={endMonthNum}
                            year={endYear}
                            onMonthChange={setEndMonthNum}
                            onYearChange={setEndYear}
                        />
                    </div>
                    <div className="row">
                        <button className="primary" onClick={() => void handleAddPeriod()}>Create period</button>
                        <button className="secondary" onClick={() => setShowAddPeriod(false)}>
                            Cancel
                        </button>
                    </div>
                </section>
            )}

            {periods.length === 0 && !showAddPeriod && (
                <p className="muted">No qualification period yet — add one to start tracking.</p>
            )}
        </div>
    );
}
