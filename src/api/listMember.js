import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  listmemberlist:'listMemberlist.json',
  listmemberdet:'listMemberdet.json',
  listmembertab1:'listorderlist.json',
  listmembertab2:'tab2.json',
  listmembertab3:'infosellist.json',
  listmembertab4:'tab4.json',
  listmembertab5:'tab5.json',
}
/********************会员列表***********************/
export default api
// 会员列表 parameter: { pageSize: 10, pageNo: 1 }
export function getListMemberList (parameter) {
  return axios({
    url: URL.bdURL + api.listmemberlist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员列表基本信息 parameter: { pageSize: 10, pageNo: 1 }
export function getListMemberDet (parameter) {
  return axios({
    url: URL.bdURL + api.listmemberdet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员查看基本信息列表tab1
export function getListMemberTab1 (parameter) {
  return axios({
    url: URL.bdURL + api.listmembertab1,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员查看基本信息列表tab2
export function getListMemberTab2 (parameter) {
  return axios({
    url: URL.bdURL + api.listmembertab2,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员查看基本信息列表tab3
export function getListMemberTab3 (parameter) {
  return axios({
    url: URL.bdURL + api.listmembertab3,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员查看基本信息列表tab4
export function getListMemberTab4 (parameter) {
  return axios({
    url: URL.bdURL + api.listmembertab4,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员查看基本信息列表tab5
export function getListMemberTab5 (parameter) {
  return axios({
    url: URL.bdURL + api.listmembertab5,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}