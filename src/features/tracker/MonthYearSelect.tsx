import { MONTH_LABELS } from "./monthRange";

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 8 }, (_, i) => CURRENT_YEAR - 1 + i);

export function MonthYearSelect({
    label,
    month,
    year,
    onMonthChange,
    onYearChange,
}: {
    label: string;
    month: string; // "01".."12", or "" if unset
    year: string; // "YYYY", or "" if unset
    onMonthChange: (month: string) => void;
    onYearChange: (year: string) => void;
}) {
    return (
        <div className="field">
            {label}
            <div className="row">
                <select value={month} onChange={(e) => onMonthChange(e.target.value)}>
                    <option value="" disabled>
                        Month
                    </option>
                    {MONTH_LABELS.map((name, i) => (
                        <option key={name} value={String(i + 1).padStart(2, "0")}>
                            {name}
                        </option>
                    ))}
                </select>
                <select value={year} onChange={(e) => onYearChange(e.target.value)}>
                    <option value="" disabled>
                        Year
                    </option>
                    {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
