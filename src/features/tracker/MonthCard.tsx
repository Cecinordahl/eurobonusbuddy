import { FlightForm } from "./FlightForm";
import { TrashIcon } from "./icons";
import { formatMonth } from "./monthRange";
import { monthTotal } from "./monthTotal";
import type { FlightEntry, MonthData } from "./trackerTypes";

export function MonthCard({
    month,
    data,
    onSave,
}: {
    month: string;
    data: MonthData | undefined;
    onSave: (patch: Partial<Omit<MonthData, "month">>) => void;
}) {
    const flights = data?.flights ?? [];

    function addFlight(entry: FlightEntry) {
        onSave({ flights: [...flights, entry] });
    }

    function removeFlight(id: string) {
        onSave({ flights: flights.filter((f) => f.id !== id) });
    }

    return (
        <section className="card stack">
            <div className="row space-between">
                <strong>{formatMonth(month)}</strong>
                <span className="pill" title="Total qualifying points logged this month">
                    {monthTotal(data)} pts
                </span>
            </div>

            <div className="grid">
                <label className="field">
                    SAS Mastercard points
                    <input
                        type="number"
                        key={`mc-${data?.mastercardPoints ?? 0}`}
                        defaultValue={data?.mastercardPoints ?? 0}
                        onBlur={(e) => onSave({ mastercardPoints: e.target.valueAsNumber || 0 })}
                    />
                </label>
                <label className="field">
                    Amex points
                    <input
                        type="number"
                        key={`amex-${data?.amexPoints ?? 0}`}
                        defaultValue={data?.amexPoints ?? 0}
                        onBlur={(e) => onSave({ amexPoints: e.target.valueAsNumber || 0 })}
                    />
                </label>
                <label className="field">
                    DnB Saga points
                    <input
                        type="number"
                        key={`dnb-${data?.dnbSagaPoints ?? 0}`}
                        defaultValue={data?.dnbSagaPoints ?? 0}
                        onBlur={(e) => onSave({ dnbSagaPoints: e.target.valueAsNumber || 0 })}
                    />
                </label>
                <label className="field">
                    Change Makers points
                    <input
                        type="number"
                        key={`cm-${data?.changeMakersPoints ?? 0}`}
                        defaultValue={data?.changeMakersPoints ?? 0}
                        onBlur={(e) => onSave({ changeMakersPoints: e.target.valueAsNumber || 0 })}
                    />
                </label>
            </div>

            <div className="stack">
                <strong className="muted">Flights</strong>
                {flights.length === 0 && <p className="muted">No flights logged.</p>}
                {flights.map((f) => (
                    <div key={f.id} className="row space-between">
                        <span>
                            {f.route} — {f.ticketType} ({f.bookingClass})
                            {f.upgraded ? ", upgraded" : ""}
                        </span>
                        <span className="row">
                            <span className="pill" title="Registered Level Points for this flight">
                                {f.levelPoints} pts
                            </span>
                            <button
                                className="icon-button secondary"
                                aria-label="Remove flight"
                                title="Remove flight"
                                onClick={() => removeFlight(f.id)}
                            >
                                <TrashIcon />
                            </button>
                        </span>
                    </div>
                ))}
                <FlightForm onAdd={addFlight} />
            </div>
        </section>
    );
}
