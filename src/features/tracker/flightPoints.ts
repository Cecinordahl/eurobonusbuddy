import { FLIGHT_LEVEL_POINTS, type FlightZone } from "../../data/flightLevelPoints";

export function ticketTypesForZone(zone: FlightZone): string[] {
    return [...new Set(FLIGHT_LEVEL_POINTS[zone].rows.map((r) => r.ticketType))];
}

export function bookingClassesFor(zone: FlightZone, ticketType: string): string[] {
    return [
        ...new Set(
            FLIGHT_LEVEL_POINTS[zone].rows
                .filter((r) => r.ticketType === ticketType)
                .flatMap((r) => r.bookingClasses)
        ),
    ];
}

export function resolveLevelPoints(
    zone: FlightZone,
    ticketType: string,
    bookingClass: string,
    upgraded: boolean
): number | null {
    const row = FLIGHT_LEVEL_POINTS[zone].rows.find(
        (r) => r.ticketType === ticketType && r.bookingClasses.includes(bookingClass)
    );
    if (!row) return null;
    return upgraded ? row.levelPointsWithUpgrade ?? row.levelPoints : row.levelPoints;
}
