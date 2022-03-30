import axios from "axios";
import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'
import { API_BASE_URL } from "../config";
const { persistAtom } = recoilPersist()


export const regionState = atom({
    key: "region-state",
    default: []
})


export const getRegions = selector({
    key: 'get-regions',
    get: ({ get }) => {
        const { getAlerts }: any = get(regionState)
        if (getAlerts === null) {
            return null
        }
        return axios.get(
            API_BASE_URL + "/regions"
        );
    }
})
