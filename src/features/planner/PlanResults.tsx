import { usePlanner } from "./usePlanner";
import { STATUS_TIERS } from "../../data/statusTiers";
import { convertSEKtoNOK, formatMoney, DEFAULT_SEK_TO_NOK } from "../../domain/currency";

function displayCost(costSEK: number, currency: "NOK" | "SEK") {
    if (currency === "SEK") return formatMoney(costSEK, "SEK");
    const nok = convertSEKtoNOK(costSEK, DEFAULT_SEK_TO_NOK);
    return formatMoney(nok, "NOK");
}


export function PlanResults() {
    const { input, remainingPoints, targetThreshold, plans } = usePlanner();
    const targetLabel = STATUS_TIERS[input.target].label;
    const currency = input.currency;

    return (
        <section className="card">
            <h2>Results</h2>

            <div className="muted" style={{ marginBottom: 10 }}>
                Target: {targetLabel} ({targetThreshold.toLocaleString()}) • Remaining: {remainingPoints.toLocaleString()} •
                Mode: <b>{input.optimizeFor === "FASTEST" ? "Fastest" : "Least spend"}</b>
            </div>

            {plans.length === 0 ? (
                <p className="muted">Click “Generate plans” to see ranked options.</p>
            ) : (
                <div className="stack">
                    {plans.map((p) => (
                        <div key={p.id} className="plan">
                            <div className="row space-between">
                                <div className="plan-title">{p.title}</div>
                                <span className="pill">
                  {p.speed === "WITHIN_24H" ? "≤ 24h" : p.speed === "INSTANT" ? "Instant" : "Unknown timing"}
                </span>
                            </div>

                            <div className="muted">
                                Points: {p.totalPoints.toLocaleString()} {p.coversGap ? "✅ covers gap" : "⚠️ may not reach target"} • Cost:{" "}
                                {p.estimatedCostSEK === null
                                    ? "Unknown (needs assumptions)"
                                    : `${displayCost(p.estimatedCostSEK, currency)} (estimated)`}
                            </div>

                            {p.warnings.length > 0 && (
                                <ul style={{ marginTop: 8 }}>
                                    {p.warnings.map((w) => (
                                        <li key={w} className="muted">
                                            {w}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {p.actions.length > 0 && (
                                <details style={{ marginTop: 8 }}>
                                    <summary>Actions</summary>
                                    <ul>
                                        {p.actions.map((a, idx) => (
                                            <li key={idx}>
                                                {a.type === "BUY_LEVEL_POINTS" && (
                                                    <>
                                                        Buy {a.points.toLocaleString()} Level Points (≈ {displayCost(a.estimatedCostSEK, currency)} estimated)
                                                    </>
                                                )}
                                                {a.type === "CAR_RENTAL" && (
                                                    <>
                                                        Car rental ({a.rentalDaysRange} days): +{a.points.toLocaleString()} Level Points
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </details>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
