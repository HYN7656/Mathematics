import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  listorderlist:'listorderlist.json',
  listorderdet:'listorderdet.json',
  listorderdettab:'listorderlisttab.json',
}
/********************订单列表***********************/
export default api
// 订单列表 parameter: { pageSize: 10, pageNo: 1 }
export function getListOrderList (parameter) {
  return axios({
    url: URL.bdURL + api.listorderlist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 订单查看基本信息 parameter: { pageSize: 10, pageNo: 1 }
export function getListOrderDet (parameter) {
  return axios({
    url: URL.bdURL + api.listorderdet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 订单查看基本信息列表 parameter: { pageSize: 10, pageNo: 1 }
export function getListOrderDetL (parameter) {
  return axios({
    url: URL.bdURL + api.listorderdettab,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
