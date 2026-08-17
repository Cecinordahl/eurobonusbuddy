import { useState } from "react";
import { FLIGHT_LEVEL_POINTS, type FlightZone } from "../../data/flightLevelPoints";
import { SAS_DESTINATIONS } from "../../data/sasDestinations";
import { bookingClassesFor, resolveLevelPoints, ticketTypesForZone } from "./flightPoints";
import { InfoTooltip } from "./InfoTooltip";
import type { FlightEntry } from "./trackerTypes";

export function FlightForm({ onAdd }: { onAdd: (entry: FlightEntry) => void }) {
    const [from, setFrom] = useState("OSL");
    const [to, setTo] = useState("");
    const [zone, setZone] = useState<FlightZone>("DOMESTIC_SCANDINAVIA");
    const [ticketType, setTicketType] = useState(ticketTypesForZone(zone)[0]);
    const [bookingClass, setBookingClass] = useState(bookingClassesFor(zone, ticketType)[0]);
    const [upgraded, setUpgraded] = useState(false);

    const bookingClasses = bookingClassesFor(zone, ticketType);

    function handleZoneChange(next: FlightZone) {
        setZone(next);
        const nextTicketType = ticketTypesForZone(next)[0];
        setTicketType(nextTicketType);
        setBookingClass(bookingClassesFor(next, nextTicketType)[0]);
    }

    function handleTicketTypeChange(next: string) {
        setTicketType(next);
        setBookingClass(bookingClassesFor(zone, next)[0]);
    }

    const levelPoints = resolveLevelPoints(zone, ticketType, bookingClass, upgraded);

    function handleAdd() {
        if (!from.trim() || !to.trim() || levelPoints == null) return;
        onAdd({
            id: crypto.randomUUID(),
            route: `${from.trim().toUpperCase()}-${to.trim().toUpperCase()}`,
            zone,
            ticketType,
            bookingClass,
            upgraded,
            levelPoints,
        });
        setTo("");
        setUpgraded(false);
    }

    return (
        <div className="stack">
            <div className="row" style={{ flexWrap: "wrap", alignItems: "flex-end" }}>
                <label className="field">
                    From
                    <input
                        list="sas-destinations"
                        placeholder="City or code"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        style={{ width: 160 }}
                    />
                </label>
                <label className="field">
                    To
                    <input
                        list="sas-destinations"
                        placeholder="City or code"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        style={{ width: 160 }}
                    />
                </label>
                <datalist id="sas-destinations">
                    {SAS_DESTINATIONS.map((d) => (
                        <option key={d.iata} value={d.iata}>
                            {d.city} ({d.iata})
                        </option>
                    ))}
                </datalist>
                <label className="field">
                    Route zone
                    <select value={zone} onChange={(e) => handleZoneChange(e.target.value as FlightZone)}>
                        <option value="DOMESTIC_SCANDINAVIA">{FLIGHT_LEVEL_POINTS.DOMESTIC_SCANDINAVIA.label}</option>
                        <option value="EUROPE">{FLIGHT_LEVEL_POINTS.EUROPE.label}</option>
                    </select>
                </label>
                <label className="field">
                    Ticket type
                    <select value={ticketType} onChange={(e) => handleTicketTypeChange(e.target.value)}>
                        {ticketTypesForZone(zone).map((t) => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="field">
                    <span className="row" style={{ gap: 4 }}>
                        Booking class
                        <InfoTooltip text="When booking: open 'Billettinformasjon' (Ticket information) under the fare you're choosing — it shows 'Klasse: X'. For a flight you've already booked: go to Manage booking and open the booking info to see the class." />
                    </span>
                    <select value={bookingClass} onChange={(e) => setBookingClass(e.target.value)}>
                        {bookingClasses.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="field">
                    Upgraded
                    <span className="row" style={{ height: 42 }}>
                        <input type="checkbox" checked={upgraded} onChange={(e) => setUpgraded(e.target.checked)} />
                    </span>
                </label>
            </div>

            <div className="row space-between">
                <label className="field">
                    <span className="row" style={{ gap: 4 }}>
                        Est. Level Points
                        <InfoTooltip text="An estimate based on the zone, ticket type, and booking class selected — this is what the flight will add once you click Add flight." />
                    </span>
                    <span className="pill">{levelPoints ?? "—"} pts</span>
                </label>
                <button className="primary" onClick={handleAdd}>Add flight</button>
            </div>
        </div>
    );
}
