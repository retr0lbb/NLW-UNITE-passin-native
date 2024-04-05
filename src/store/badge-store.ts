import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage"

export type BadgeStore = {
    id: String,
    name: String,
    email: String
    eventTitle: String,
    checkInURL: String,
    image?: String
}

type StateProps = {
    data: BadgeStore | null
    save: (data: BadgeStore) => void
    remove: () => void
}

export const useBadgeStore = create(
    persist<StateProps>(
        (set) => ({
    data: null,

    save: (data: BadgeStore) => set(() => ({ data })),
    remove: () => set(()=>({ data: null }))
}), { 
    name: "nlw-unite:badge",
    storage: createJSONStorage(() => AsyncStorage)
}))