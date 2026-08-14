import { useContext } from "react";
import { TrackerCtx } from "./TrackerStore";

export function useTracker() {
    const v = useContext(TrackerCtx);
    if (!v) throw new Error("useTracker must be used within TrackerProvider");
    return v;
}
