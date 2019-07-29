import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  list:'cardlist.json',
  det:'carddet.json',
  sel:'cardsel.json',
  add:'cardsel.json',
  edit:'cardsel.json',
}

export default api
// 获取轮播图列表 parameter: { pageSize: 10, pageNo: 1 }
export function getCardList (parameter) {
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
export function getCardDet (parameter) {
  return axios({
    url: URL.bdURL + api.det,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 内容下拉列表
export function getCardSel (parameter) {
  return axios({
    url: URL.bdURL + api.sel,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 新增
export function getCardAdd (parameter) {
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
export function getCardEdit (parameter) {
  return axios({
    url: URL.bdURL + api.edit,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
