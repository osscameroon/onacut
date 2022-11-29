import { atom, selector } from "recoil";
import axios from "axios";
import { globalUrls } from "./urls";

export let alertsState = atom({
    key: "alerts-state",
    default: "",
});

export const acceptState = atom({
    key: 'accept-state',
    default: true
})

export const detailsState = atom({
    key: "region-state",
    default: []
})

class AlertService {
    static getAlerts = selector({
        key: 'get-alerts',
        get: ({ get }) => {
            const { getAlerts }: any = get(alertsState)
            if (getAlerts === null) {
                return null
            }
            return axios.get(globalUrls.GET_ALERTS);
        }
    });

    static getDetails = selector({
        key: 'get-details',
        get: ({ get }) => {
            const { getDetails }: any = get(detailsState)
            if (getDetails === null) {
                return null
            }
            return axios.get(
                globalUrls.GET_REGION_ALERTS(localStorage.getItem("myRegionName") ?? "")
                // globalUrls.GET_REGION_ALERTS("2"),
                // {
                //     headers: {
                //         authorization: ' xxxxxxxxxx',
                //         'Content-Type': 'application/json'
                //     }
                // }).then(function (response) {
                //     console.log(response);
                // }
                );
        }
    })
}


export default AlertService
