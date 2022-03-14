import axios from "axios";
import { atom, selector } from "recoil"

export const detailsState = atom({
    key: "region-state",
    default: []
})


export const getDetails = selector({
    key: 'get-details',
    get: ({ get }) => {
        const { getDetails }: any = get(detailsState)
        if (getDetails === null) {
            return null
        }
        return axios.get(
            "http://localhost:5000/api/alerts?region=" + localStorage.getItem("myRegionName")
        );
    }
})
