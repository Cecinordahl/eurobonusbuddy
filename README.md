# EuroBonus Buddy

A planner for reaching your next SAS EuroBonus status tier (Sølv / Gull / Diamant) as fast as possible.

Given your current Level Points and target tier, it generates plans from known earning methods — credit
card status points, buying Level Points, car rentals, flights, and the Conscious Traveler program —
and shows the fastest/cheapest routes to close the gap.

## Status

- **Planner** — form + generated plans: working
- **Methods** — browsable list of earning methods and their rules: working
- **Compare** — side-by-side plan comparison: not started (Phase 3)
- **Rules & assumptions** — posting delays, caps, calculation notes: not started (Phase 3)

## Tech stack

- React 19 + TypeScript
- Vite
- React Router

## Running locally

```bash
npm install
npm run dev
```

The app runs at the URL Vite prints (defaults to `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```
