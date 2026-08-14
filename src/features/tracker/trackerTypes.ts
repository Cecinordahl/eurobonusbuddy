import type { FlightZone } from "../../data/flightLevelPoints";

export type QualificationPeriod = {
    id: string;
    label: string;
    startMonth: string; // "YYYY-MM"
    endMonth: string; // "YYYY-MM"
    isDefault: boolean;
};

export type FlightEntry = {
    id: string;
    route: string;
    zone: FlightZone;
    ticketType: string;
    bookingClass: string;
    upgraded: boolean;
    levelPoints: number;
};

export type MonthData = {
    month: string; // "YYYY-MM"
    mastercardPoints: number;
    amexPoints: number;
    dnbSagaPoints: number;
    changeMakersPoints: number;
    flights: FlightEntry[];
};

export const MAX_PERIODS = 2;
