export type EarningMethodGroup = "Credit cards" | "Shopping" | "Travel" | "Other";

export type EarningMethod = {
    id: string;
    name: string;
    group: EarningMethodGroup;
    summary: string;
    rules: string[];
};

export const earningMethods: EarningMethod[] = [
    {
        id: "amex-elite",
        name: "SAS Amex Elite",
        group: "Credit cards",
        summary: "Earn a yearly status-point bonus after holding/using the card for a year.",
        rules: ["20,000 status points per year", "Transferred after you have used the card for 1 year"],
    },
    {
        id: "dnb-saga",
        name: "DnB Saga / Private Banking Mastercard",
        group: "Credit cards",
        summary: "Status points based on annual spend thresholds.",
        rules: ["100,000 NOK spend = 10,000 status points", "200,000 NOK spend = 20,000 status points"],
    },
    {
        id: "sas-mc-premium",
        name: "SAS Mastercard Premium",
        group: "Credit cards",
        summary: "Monthly status points based on bonus points earned via the card.",
        rules: [
            "Status points earned on 25% of the month's earned bonus points via the card",
            "Includes purchases from connected PointEarner cards",
            "Minimum 500 status points per month as long as you used the card",
            "Transferred on the 8th of the following month",
        ],
    },
    {
        id: "conscious-traveler",
        name: "Conscious Traveler",
        group: "Shopping",
        summary: "Annual points after completing all steps, with delays for purchases.",
        rules: [
            "5,000 points per year after completing 10 steps",
            "Purchases can take over 1 month to be approved/credited",
            "Biofuel add-on: credited once per booking (consider separate bookings)",
        ],
    },
    {
        id: "flights",
        name: "Flights (SAS)",
        group: "Travel",
        summary: "Flight earnings depend on booking class and route. Start by using official tables/calculators.",
        rules: ["Use SAS booking class tables for exact earnings", "We can integrate a flight calculator later"],
    },
    {
        id: "car-rental",
        name: "Car rental (status points)",
        group: "Travel",
        summary: "Tiered status points per rental length.",
        rules: ["1–6 days: 1,000 status points", "7–27 days: 1,500 status points", "28+ days: 2,000 status points"],
    },
    {
        id: "buy-status-points",
        name: "Buy status points",
        group: "Other",
        summary: "Purchase status points if eligibility conditions are met, with caps by target tier.",
        rules: [
            "Must be 6 months into qualification period and have earned more than half of points needed to next tier",
            "Buy in blocks of 100 points",
            "Max to reach: Sølv 5,000 / Gull 15,000 / Diamant 30,000",
            "Must have earned in the period: 15,000 / 30,000 / 60,000",
            "Can take up to 24 hours; points backdated 123 days",
        ],
    },
];
