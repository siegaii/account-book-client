import { request } from 'utils/request';

const URL = '/api/v1';

// 空宣首页列表
export const getBill = () =>
  request({
    method: 'get',
    url: `${URL}/bill`
  });
