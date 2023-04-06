import axios from 'axios'


export function LoginUser(request) {

    return axios.post('https://echoes.agency/users/login',request)

      .then((data) => data)
      .catch((error) => {
        console.log(request);
        return error.response;
      });
  }