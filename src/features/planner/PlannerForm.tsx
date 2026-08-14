import { usePlanner } from "./usePlanner";
import type { StatusTier } from "../../data/statusTiers";
import { STATUS_TIERS } from "../../data/statusTiers";
import type { Currency } from "../../domain/currency";
import type {OptimizeFor} from "./plannerTypes.ts";

export function PlannerForm() {
    const { input, setInput, generate } = usePlanner();

    function set<K extends keyof typeof input>(key: K, value: (typeof input)[K]) {
        setInput({ ...input, [key]: value });
    }

    const totalMonths = input.monthsElapsed + input.monthsRemaining;
    const monthsMismatch = totalMonths !== 12;


    return (
        <section className="card">
            <h2>Planner</h2>

            <div className="grid">
                <label className="field">
                    <span>Current status points</span>
                    <input
                        type="number"
                        min={0}
                        value={input.currentPoints}
                        onChange={(e) => set("currentPoints", Number(e.target.value))}
                    />
                </label>

                <label className="field">
                    <span>Target tier</span>
                    <select value={input.target} onChange={(e) => set("target", e.target.value as StatusTier)}>
                        <option value="SILVER">{STATUS_TIERS.SILVER.label}</option>
                        <option value="GOLD">{STATUS_TIERS.GOLD.label}</option>
                        <option value="DIAMOND">{STATUS_TIERS.DIAMOND.label}</option>
                    </select>
                </label>

                <label className="field">
                    <span>Months elapsed (in qualification period)</span>
                    <input
                        type="number"
                        min={0}
                        max={12}
                        value={input.monthsElapsed}
                        onChange={(e) => set("monthsElapsed", Number(e.target.value))}
                    />
                </label>

                <label className="field">
                    <span>Months remaining (in qualification period)</span>
                    <input
                        type="number"
                        min={0}
                        max={12}
                        value={input.monthsRemaining}
                        onChange={(e) => set("monthsRemaining", Number(e.target.value))}
                    />
                </label>

                <label className="field">
                    <span>Optimize for</span>
                    <select value={input.optimizeFor} onChange={(e) => set("optimizeFor", e.target.value as OptimizeFor)}>
                        <option value="FASTEST">Fastest</option>
                        <option value="CHEAPEST">Least spend</option>
                    </select>
                </label>

                <label className="field">
                    <span>Currency (estimates)</span>
                    <select value={input.currency} onChange={(e) => set("currency", e.target.value as Currency)}>
                        <option value="NOK">NOK</option>
                        <option value="SEK">SEK</option>
                    </select>
                </label>
            </div>

            {monthsMismatch && (
                <div
                    style={{
                        marginTop: 10,
                        padding: "10px 12px",
                        borderRadius: 12,
                        border: "1px solid rgba(255, 193, 7, 0.4)",
                        background: "rgba(255, 193, 7, 0.12)",
                    }}
                >
                    <strong>⚠️ Check qualification period</strong>
                    <div className="muted" style={{ marginTop: 4 }}>
                        Months elapsed ({input.monthsElapsed}) + months remaining ({input.monthsRemaining}) ={" "}
                        {totalMonths}. A standard qualification period is 12 months.
                        <br />
                        This may affect buy-points eligibility and timeline accuracy.
                    </div>
                </div>
            )}


            <div className="row" style={{ marginTop: 10 }}>
                <button onClick={generate}>Generate plans</button>
            </div>

            <p className="muted" style={{ marginTop: 10 }}>
                Tip: buy-points eligibility requires ≥ 6 months elapsed.
            </p>
        </section>
    );
}
