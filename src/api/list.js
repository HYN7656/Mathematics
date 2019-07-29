import { axios } from '@/utils/request'

const api = {
  info: '/user',
  list: '/users'
}


// 获取用户列表 parameter: { pageSize: 10, pageNo: 1 }
export function getList (parameter) {
  return axios({
    url: 'https://randomuser.me/api',
    method: 'get',
    params: parameter
  })
}
