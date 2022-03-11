import axios from "axios";
import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const alertsState = atom({
    key: "alerts-state",
    default: [],
    effects_UNSTABLE: [persistAtom],

})

export const getAlerts = selector({
    key: 'get-alerts',
    get: ({ get }) => {
        const { getAlerts }: any = get(alertsState)
        if (getAlerts === null) {
            return null
        }
        return axios.get(
            "http://localhost:5000/api/alerts"
        );
    }
})
