import axios from "axios";
import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
import { API_BASE_URL } from "../config";


export const cityState = atom({
    key: "city-state",
    default: []
})


export const getCities = selector({
    key: 'get-cities',
    get: ({ get }) => {
        const { getCities }: any = get(cityState)
        if (getCities === null) {
            return null
        }
        return axios.get(
            API_BASE_URL+"/cities"
        );
    }
})
