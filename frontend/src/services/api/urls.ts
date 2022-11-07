import {config} from '../../config';

const prefixer = config.apiUrl;

export const globalUrls = {
    GET_ALERTS: `${prefixer}/alerts`,
    GET_REGION_ALERTS: (region: string) => `${prefixer}/alerts?region=${region}`,
    GET_CITIES: `${prefixer}/cities`,
    GET_REGION: `${prefixer}/regions`,
}
