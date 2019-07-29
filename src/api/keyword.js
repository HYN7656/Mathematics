import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  list:'keywordlist.json',
  det:'keyworddet.json',
  add:'keywordsel.json',
}

export default api
// 获取轮播图列表 parameter: { pageSize: 10, pageNo: 1 }
export function getKeyList (parameter) {
  return axios({
    url: URL.bdURL + api.list,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 删除
export function getKeyDet (parameter) {
  return axios({
    url: URL.bdURL + api.det,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 新增
export function getKeyAdd (parameter) {
  return axios({
    url: URL.bdURL + api.add,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

