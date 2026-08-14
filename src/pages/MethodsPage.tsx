import { earningMethods } from "../data/earningMethods";
import type { EarningMethodGroup } from "../data/earningMethods";

const GROUP_ORDER: EarningMethodGroup[] = ["Credit cards", "Shopping", "Travel", "Other"];

function groupBy<T extends { group: string }>(items: T[]) {
    return items.reduce<Record<string, T[]>>((acc, item) => {
        (acc[item.group] ??= []).push(item);
        return acc;
    }, {});
}

export default function MethodsPage() {
    const grouped = groupBy(earningMethods);

    return (
        <div className="stack">
            <h1>Earning methods</h1>
            <p className="muted">Browse by category. These are the methods the planner will use.</p>

            {GROUP_ORDER.map((group) => {
                const items = grouped[group] ?? [];
                if (items.length === 0) return null;

                return (
                    <section key={group} className="card">
                        <h2>{group}</h2>

                        <div className="stack" style={{ marginTop: 12 }}>
                            {items.map((m) => (
                                <section key={m.id} className="card" style={{ padding: 12 }}>
                                    <div className="row space-between">
                                        <h3 style={{ margin: 0 }}>{m.name}</h3>
                                        <span className="pill">{m.group}</span>
                                    </div>

                                    <p className="muted" style={{ marginTop: 8 }}>
                                        {m.summary}
                                    </p>

                                    <ul style={{ marginTop: 8 }}>
                                        {m.rules.map((r) => (
                                            <li key={r}>{r}</li>
                                        ))}
                                    </ul>
                                </section>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
