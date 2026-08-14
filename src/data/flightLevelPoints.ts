export type FlightZone = "DOMESTIC_SCANDINAVIA" | "EUROPE";

export type FlightFareRow = {
    ticketType: string;
    bookingClasses: string[];
    levelPoints: number;
    // null where SAS's own table has no upgrade figure for that row (e.g. Business rows in Europe)
    levelPointsWithUpgrade: number | null;
};

export const FLIGHT_LEVEL_POINTS: Record<FlightZone, { label: string; effectiveFrom: string; rows: FlightFareRow[] }> = {
    DOMESTIC_SCANDINAVIA: {
        label: "Innenriks og Skandinavia",
        effectiveFrom: "2025-10-01",
        rows: [
            { ticketType: "Light", bookingClasses: ["E", "H", "K", "L", "M", "N", "O", "Q", "R", "T", "U", "V", "W"], levelPoints: 100, levelPointsWithUpgrade: 350 },
            { ticketType: "Standard", bookingClasses: ["G", "U", "R", "K", "N", "L", "T", "O", "V"], levelPoints: 250, levelPointsWithUpgrade: 500 },
            { ticketType: "Standard", bookingClasses: ["E", "H", "M", "Q", "W"], levelPoints: 500, levelPointsWithUpgrade: 750 },
            { ticketType: "Flex", bookingClasses: ["G", "U", "R", "K", "N", "L", "T", "O", "V"], levelPoints: 600, levelPointsWithUpgrade: 850 },
            { ticketType: "Flex", bookingClasses: ["E", "H", "M", "Q", "W"], levelPoints: 700, levelPointsWithUpgrade: 950 },
            { ticketType: "Premium", bookingClasses: ["A", "P", "B", "J", "S", "Y"], levelPoints: 700, levelPointsWithUpgrade: 950 },
            { ticketType: "Premium", bookingClasses: ["D", "Z", "C"], levelPoints: 850, levelPointsWithUpgrade: 1100 },
            { ticketType: "Premium Flex", bookingClasses: ["A", "P", "B", "J", "S", "Y"], levelPoints: 1000, levelPointsWithUpgrade: 1250 },
            { ticketType: "Premium Flex", bookingClasses: ["D", "Z", "C"], levelPoints: 1200, levelPointsWithUpgrade: 1450 },
            { ticketType: "Business", bookingClasses: ["A", "P", "B", "J", "S", "Y"], levelPoints: 1000, levelPointsWithUpgrade: 1250 },
            { ticketType: "Business", bookingClasses: ["D", "Z", "C"], levelPoints: 1200, levelPointsWithUpgrade: 1450 },
            { ticketType: "Business Flex", bookingClasses: ["A", "P", "B", "J", "S", "Y"], levelPoints: 1500, levelPointsWithUpgrade: 1750 },
            { ticketType: "Business Flex", bookingClasses: ["D", "Z", "C"], levelPoints: 2000, levelPointsWithUpgrade: 2250 },
        ],
    },
    EUROPE: {
        label: "Europa",
        effectiveFrom: "2025-10-01",
        rows: [
            { ticketType: "Light", bookingClasses: ["E", "H", "K", "L", "M", "N", "O", "Q", "R", "T", "U", "V", "W"], levelPoints: 100, levelPointsWithUpgrade: 600 },
            { ticketType: "Standard", bookingClasses: ["G", "K", "L", "N", "O", "R", "T", "U", "V"], levelPoints: 500, levelPointsWithUpgrade: 1000 },
            { ticketType: "Standard", bookingClasses: ["E", "H", "M", "Q", "W"], levelPoints: 1000, levelPointsWithUpgrade: 1500 },
            { ticketType: "Flex", bookingClasses: ["G", "K", "L", "N", "O", "R", "T", "U", "V"], levelPoints: 1200, levelPointsWithUpgrade: 1700 },
            { ticketType: "Flex", bookingClasses: ["E", "H", "M", "Q", "W"], levelPoints: 1400, levelPointsWithUpgrade: 1900 },
            { ticketType: "Business", bookingClasses: ["A", "P", "B", "J", "S", "Y"], levelPoints: 1500, levelPointsWithUpgrade: null },
            { ticketType: "Business", bookingClasses: ["D", "Z", "C"], levelPoints: 1700, levelPointsWithUpgrade: null },
            { ticketType: "Business Flex", bookingClasses: ["A", "P"], levelPoints: 2000, levelPointsWithUpgrade: null },
            { ticketType: "Business Flex", bookingClasses: ["B", "J", "S", "Y"], levelPoints: 2500, levelPointsWithUpgrade: null },
            { ticketType: "Business Flex", bookingClasses: ["D", "Z", "C"], levelPoints: 3000, levelPointsWithUpgrade: null },
        ],
    },
};

// Cost (in Level Points) to add an upgrade on top of a ticket's base Level Points, per zone.
export const UPGRADE_TO_BUSINESS_COST: Record<FlightZone, number> = {
    DOMESTIC_SCANDINAVIA: 250,
    EUROPE: 500,
};
