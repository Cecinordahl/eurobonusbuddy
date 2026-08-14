import { RequireAuth } from "../features/auth/RequireAuth";
import { TrackerProvider } from "../features/tracker/TrackerProvider";
import { TrackerView } from "../features/tracker/TrackerView";

export default function TrackerPage() {
    return (
        <RequireAuth>
            <TrackerProvider>
                <TrackerView />
            </TrackerProvider>
        </RequireAuth>
    );
}
