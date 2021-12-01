import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export const dataState = atom({
    key: 'data_state',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

