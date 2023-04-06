import { API } from '../config/api.config';
import { PathApi } from '../config/api.path.config';

export default function GetUsers() {
    return API.get(PathApi.getallusers)
      .then((data: any) => {
        return data;
      })
      .catch((error: any) => {
        return error.response;
      });
  }