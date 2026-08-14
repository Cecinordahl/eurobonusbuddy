// "YYYY-MM" -> ["YYYY-MM", ...] from start through end inclusive, in order.
export function monthsInRange(startMonth: string, endMonth: string): string[] {
    const [startYear, startMonthNum] = startMonth.split("-").map(Number);
    const [endYear, endMonthNum] = endMonth.split("-").map(Number);

    const months: string[] = [];
    let year = startYear;
    let month = startMonthNum;

    while (year < endYear || (year === endYear && month <= endMonthNum)) {
        months.push(`${year}-${String(month).padStart(2, "0")}`);
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
    }

    return months;
}

const MONTH_LABELS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

export function formatMonth(month: string): string {
    const [year, monthNum] = month.split("-").map(Number);
    return `${MONTH_LABELS[monthNum - 1]} ${year}`;
}

const MONTH_LABELS_SHORT = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function formatMonthShort(month: string): string {
    const [year, monthNum] = month.split("-").map(Number);
    return `${MONTH_LABELS_SHORT[monthNum - 1]} ${year}`;
}

export function periodLabel(startMonth: string, endMonth: string): string {
    return `${formatMonthShort(startMonth)} – ${formatMonthShort(endMonth)}`;
}

export { MONTH_LABELS, MONTH_LABELS_SHORT };
