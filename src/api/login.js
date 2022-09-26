// 所有登录接口想换信息
import request from '@/utils/request'
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export const getImgAPI = () => {
  return request({
    url: `/user-service/user/imageCode/${Math.random()}`,
    responseType: 'blob'
  })
}
