import { Link } from "react-router-dom";

const CHART_WIDTH = 1300;
const CHART_HEIGHT = 260;

const TIERS = [
    { label: "SILVER", x: 280, y: 175 },
    { label: "GOLD", x: 560, y: 120 },
    { label: "DIAMOND", x: 860, y: 65 },
];

export function Hero() {
    return (
        <section className="hero">
            <svg className="hero-chart" viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} fill="none" aria-hidden="true">
                <path
                    d="M 20 220 C 130 205, 200 190, 280 175 C 380 156, 460 140, 560 120 C 660 100, 760 85, 860 65 C 970 43, 1080 30, 1260 20"
                    stroke="rgba(16, 20, 26, 0.25)"
                    strokeWidth="2"
                    strokeDasharray="1 8"
                    strokeLinecap="round"
                />
                <g transform="translate(1260 20) rotate(-18)">
                    <polygon points="0,-9 22,0 0,9 5,0" fill="var(--accent)" />
                </g>
                <circle cx="20" cy="220" r="4" fill="rgba(16, 20, 26, 0.35)" />
                {TIERS.map((t) => (
                    <g key={t.label}>
                        <circle cx={t.x} cy={t.y} r="4.5" fill="var(--accent)" />
                        <text
                            x={t.x}
                            y={t.y - 16}
                            textAnchor="middle"
                            className="hero-chart-label"
                            fill="rgba(16, 20, 26, 0.6)"
                        >
                            {t.label}
                        </text>
                    </g>
                ))}
            </svg>
            <div className="hero-text">
                <h1 className="hero-headline">
                    Track your climb.
                    <br />
                    Land your status.
                </h1>
                <p className="hero-wordmark">EuroBonusBuddy</p>
                <Link to="/planner" className="btn primary hero-cta">
                    Start planning
                </Link>
            </div>
        </section>
    );
}
