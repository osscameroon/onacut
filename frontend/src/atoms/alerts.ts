import axios from "axios"
import {atom, selector} from "recoil"
import {API_BASE_URL} from "../config";


export let alertsState = atom({
    key: "alerts-state",
    default: "",
})


export const getAlerts = selector({
    key: 'get-alerts',
    get: ({get}) => {
        const {getAlerts}: any = get(alertsState)
        if (getAlerts === null) {
            return null
        }
        return axios.get(
            API_BASE_URL + "/alerts"
        );
    }
})
