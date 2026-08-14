import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../auth/useAuth";
import { periodLabel } from "./monthRange";
import { TrackerCtx } from "./TrackerStore";
import { MAX_PERIODS, type MonthData, type QualificationPeriod } from "./trackerTypes";

export function TrackerProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const uid = user!.uid;

    const [periods, setPeriods] = useState<QualificationPeriod[]>([]);
    const [periodsLoading, setPeriodsLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "users", uid, "periods"), orderBy("startMonth"));
        return onSnapshot(q, (snap) => {
            const next = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<QualificationPeriod, "id">) }));
            setPeriods(next);
            setPeriodsLoading(false);
        });
    }, [uid]);

    const addPeriod = useCallback(
        async (input: { startMonth: string; endMonth: string }) => {
            if (periods.length >= MAX_PERIODS) return;
            await addDoc(collection(db, "users", uid, "periods"), {
                ...input,
                label: periodLabel(input.startMonth, input.endMonth),
                isDefault: periods.length === 0,
            });
        },
        [uid, periods.length]
    );

    const removePeriod = useCallback(
        async (id: string) => {
            await deleteDoc(doc(db, "users", uid, "periods", id));
        },
        [uid]
    );

    const [monthsByPeriod, setMonthsByPeriod] = useState<Record<string, Record<string, MonthData>>>({});
    const unsubsRef = useRef<Record<string, () => void>>({});

    // Subscribe to each period's months as periods appear; unsubscribe as they disappear.
    useEffect(() => {
        const currentIds = new Set(periods.map((p) => p.id));

        periods.forEach((p) => {
            if (unsubsRef.current[p.id]) return;
            const monthsRef = collection(db, "users", uid, "periods", p.id, "months");
            unsubsRef.current[p.id] = onSnapshot(monthsRef, (snap) => {
                const next: Record<string, MonthData> = {};
                snap.docs.forEach((d) => {
                    next[d.id] = d.data() as MonthData;
                });
                setMonthsByPeriod((prev) => ({ ...prev, [p.id]: next }));
            });
        });

        Object.keys(unsubsRef.current).forEach((id) => {
            if (!currentIds.has(id)) {
                unsubsRef.current[id]();
                delete unsubsRef.current[id];
            }
        });
    }, [uid, periods]);

    // Tear down all subscriptions on unmount / account change.
    useEffect(() => {
        return () => {
            Object.values(unsubsRef.current).forEach((unsub) => unsub());
            unsubsRef.current = {};
        };
    }, [uid]);

    const upsertMonth = useCallback(
        async (periodId: string, month: string, patch: Partial<Omit<MonthData, "month">>) => {
            const ref = doc(db, "users", uid, "periods", periodId, "months", month);
            const existing = monthsByPeriod[periodId]?.[month];
            const next: MonthData = {
                month,
                mastercardPoints: existing?.mastercardPoints ?? 0,
                amexPoints: existing?.amexPoints ?? 0,
                dnbSagaPoints: existing?.dnbSagaPoints ?? 0,
                changeMakersPoints: existing?.changeMakersPoints ?? 0,
                flights: existing?.flights ?? [],
                ...patch,
            };
            await setDoc(ref, next);
        },
        [uid, monthsByPeriod]
    );

    const value = useMemo(
        () => ({
            periods,
            periodsLoading,
            addPeriod,
            removePeriod,
            monthsByPeriod,
            upsertMonth,
        }),
        [periods, periodsLoading, addPeriod, removePeriod, monthsByPeriod, upsertMonth]
    );

    return <TrackerCtx.Provider value={value}>{children}</TrackerCtx.Provider>;
}
