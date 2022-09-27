// 所有登录接口想换信息
import request from '@/utils/request'
export function loginAPI(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}

export const getImgAPI = (math) => {
  return request({
    url: `/user-service/user/imageCode/${math}`,
    responseType: 'blob'
  })
}
