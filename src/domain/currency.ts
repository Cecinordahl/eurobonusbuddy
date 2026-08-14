export type Currency = "NOK" | "SEK";

export const DEFAULT_CURRENCY: Currency = "NOK";

/**
 * Estimated FX rate (SEK -> NOK). Keep it configurable.
 * Last known mid-market rate around ~1.09 NOK per 1 SEK (varies daily).
 */
export const DEFAULT_SEK_TO_NOK = 1.09;

export function convertSEKtoNOK(amountSEK: number, sekToNok = DEFAULT_SEK_TO_NOK): number {
    return amountSEK * sekToNok;
}

export function formatMoney(amount: number, currency: Currency) {
    // Use Norwegian formatting for NOK; Swedish for SEK is fine but we keep it consistent.
    return new Intl.NumberFormat("nb-NO", {
        style: "currency",
        currency,
        maximumFractionDigits: 0,
    }).format(amount);
}
