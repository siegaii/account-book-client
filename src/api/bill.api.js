import { request } from 'utils/request';

const URL = '/api/v1';

// 空宣首页列表
export const getBill = (params) =>
  request({
    method: 'get',
    url: `${URL}/bill`,
    params
  });

// 添加账单
export const postBill = (data) =>
  request({
    method: 'post',
    url: `${URL}/bill`,
    data
  });
