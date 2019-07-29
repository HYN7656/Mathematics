import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  comprehensivelist:'comprehensivelist.json',
  comprehensivedet:'comprehensivedet.json',
  comprehensivesel:'comprehensivesel.json',
  resultlistlist:'Resultlist.json',
  listmembertab3:'infosellist.json',
  listmembertab4:'tab4.json',
  listmembertab5:'tab5.json',
}
/********************会员列表***********************/
export default api
// 综合测评列表 parameter: { pageSize: 10, pageNo: 1 }
export function getComprehensiveList (parameter) {
  return axios({
    url: URL.bdURL + api.comprehensivelist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 综合测评基本信息 parameter: { pageSize: 10, pageNo: 1 }
export function getComprehensiveDet (parameter) {
  return axios({
    url: URL.bdURL + api.comprehensivedet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 综合测评基本信息列表
export function getComprehensiveSel (parameter) {
  return axios({
    url: URL.bdURL + api.comprehensivesel,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 会员查看基本信息列表tab2
export function getResultlistList (parameter) {
  return axios({
    url: URL.bdURL + api.resultlistlist,
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