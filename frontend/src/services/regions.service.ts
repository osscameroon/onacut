import axios from 'axios';
import { API } from '../constants/api';
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};
// export class RegionService {
//   static regions = async (region: any) => {
//     const data = new FormData();
//     data.append(`${API.regions.params[0]}`, region);
//     try {
//       const result = await axios({
//         url: API.regions.path,
//         data,
//         method: API.regions.type,
//         headers,
//       });
//       return result.data;
//     } catch (e: any) {
//       console.log(e, 'error');
//     }
//   };
// }
