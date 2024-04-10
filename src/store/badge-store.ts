import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from "@react-native-async-storage/async-storage"

export type BadgeStore = {
    id: String,
    name: String,
    email: String
    eventTitle: String,
    checkInURL: String,
    image?: String,
    eventDate: String
}

type StateProps = {
    data: BadgeStore | null
    save: (data: BadgeStore) => void
    remove: () => void
    updateAvatar: (uri: string) => void
}

export const useBadgeStore = create(
    persist<StateProps>(
        (set) => ({
    data: null,

    save: (data: BadgeStore) => set(() => ({ data })),
    remove: () => set(()=>({ data: null })),
    updateAvatar: (uri:string) => set((state) => ({
        data: state.data? { ...state.data, image: uri } : null  
    }))
}), { 
    name: "nlw-unite:badge",
    storage: createJSONStorage(() => AsyncStorage)
}))