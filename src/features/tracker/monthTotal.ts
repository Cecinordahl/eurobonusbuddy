import type { MonthData } from "./trackerTypes";

export function monthTotal(data: MonthData | undefined): number {
    if (!data) return 0;
    const flightsTotal = data.flights.reduce((sum, f) => sum + f.levelPoints, 0);
    return data.mastercardPoints + data.amexPoints + data.dnbSagaPoints + data.changeMakersPoints + flightsTotal;
}
