import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  list:'helplist.json',
  det:'helpdet.json',
  add:'helpdet.json',
  edit:'helpdet.json',
}

export default api
// 获取轮播图列表 parameter: { pageSize: 10, pageNo: 1 }
export function getHelpList (parameter) {
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
export function getHelpDet (parameter) {
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
export function getHelpAdd (parameter) {
  return axios({
    url: URL.bdURL + api.add,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 编辑
export function getHelpEdit (parameter) {
  return axios({
    url: URL.bdURL + api.edit,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
