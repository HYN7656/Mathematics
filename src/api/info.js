import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  list:'infolist.json',
  det:'infodet.json',
  sel:'infosel.json',
  add:'infosel.json',
  edit:'infosel.json',
  del:'infosel.json',
  sellist:'infosellist.json',
}

export default api
// 获取轮播图列表 parameter: { pageSize: 10, pageNo: 1 }
export function getInfoList (parameter) {
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
export function getInfoDet (parameter) {
  return axios({
    url: URL.bdURL + api.det,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 课程推荐列表
export function getInfoSel (parameter) {
  return axios({
    url: URL.bdURL + api.sel,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
export function getInfoSelList (parameter) {
  return axios({
    url: URL.bdURL + api.sellist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 新增
export function getInfoAdd (parameter) {
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
export function getInfoEdit (parameter) {
  return axios({
    url: URL.bdURL + api.edit,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
// 编辑
export function getInfoDel (parameter) {
  return axios({
    url: URL.bdURL + api.del,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

