import {atom, selector} from "recoil";
import axios from "axios";
import {globalUrls} from "./urls";

export const cityState = atom({
    key: "city-state",
    default: []
});


export const regionState = atom({
    key: "region-state",
    default: []
})

export const districtState = atom({
    key: "district-state",
    default: []
})


class CityService {
    static getCities = selector({
        key: 'get-cities',
        get: ({get}) => {
            const {getCities}: any = get(cityState)
            if (getCities === null) {
                return null
            }
            return axios.get(
                globalUrls.GET_CITIES
            );
        },
    })

    static getRegions = selector({
        key: 'get-regions',
        get: ({get}) => {
            const {getAlerts}: any = get(regionState)
            if (getAlerts === null) {
                return null
            }
            return axios.get(
                globalUrls.GET_REGION
            );
        }
    })

    static getDistricts = selector({
        key: 'get-districts',
        get: ({get}) => {
            const {data}: any = get(districtState)
            if (data === null) {
                return null
            }
            return axios.get(
                globalUrls.GET_DISTRICT
            );
        }
    })
}

export default CityService;
