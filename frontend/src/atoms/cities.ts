import axios from "axios";
import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()


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
            "http://localhost:5000/api/cities"
        );
    }
})
