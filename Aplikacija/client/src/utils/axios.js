const axios = require('axios');
const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');

    config.headers = { 
      'x-auth-token': token,
    }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default axiosApiInstance;