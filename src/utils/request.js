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

// $axios.interceptors.response.use(
//   (response) => {
//     const { data } = response;

//     if (response.config.url.match(/\.json$/) && response.config.method === 'get') {
//       return data;
//     }

//     if (
//       response.config.url === '/api/v1/pc/user/info' &&
//       response.config.method === 'get' &&
//       (data.code === 1001 || data.code === 1000)
//     ) {
//       // 兼容老互动空宣
//       store.commit('EXIT');
//       return Promise.reject(data.msg);
//     }

//     if (data.code === 100) {
//       // 1000 未登录 提示用户登录
//       // 1001 登录过期，若登录过期需要清空store
//       // codeStatus(data.code, store);
//       return data.data;
//     } else {
//       // debugger;
//       pcErrorEvent(data.code, store);
//       return Promise.reject(data.msg);
//     }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
