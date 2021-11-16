interface IApiItem {
  type: 'POST' | 'GET';
  path: string;
  params?: string[];
}
interface IApi {
  regions: IApiItem;
}
const BASE_URL = `https://alert.eneo.cm`;
export const API: IApi = {
  regions: {
    type: 'POST',
    path: `${BASE_URL}/ajaxOutage.php`,
    params: ['region'],
  },
};
