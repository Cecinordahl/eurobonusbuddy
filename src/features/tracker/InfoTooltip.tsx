export function InfoTooltip({ text }: { text: string }) {
    return (
        <span className="info-icon" tabIndex={0}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="11" x2="12" y2="16" strokeLinecap="round" />
                <circle cx="12" cy="7.5" r="0.75" fill="currentColor" stroke="none" />
            </svg>
            <span className="info-tooltip" role="tooltip">
                {text}
            </span>
        </span>
    );
}
