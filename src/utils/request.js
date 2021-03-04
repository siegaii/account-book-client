import axios from 'axios';

export const request = axios.create();

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    const { data, status } = response;
    if (status === 200) {
      return data.data;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
