import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  comprehensivelist:'comprehensivelist.json',
  comprehensivedet:'comprehensivedet.json',
  comprehensivesel:'comprehensivesel.json',
  resultlist:'Resultlist.json',
  resultdet:'Resultdet.json',
  resultlist2:'Resultlist2.json',
  subjectlist:'Resultlist2.json',
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

// 测评结果列表
export function getResultlistList (parameter) {
  return axios({
    url: URL.bdURL + api.resultlist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 测评结果基本信息
export function getResultDet (parameter) {
  return axios({
    url: URL.bdURL + api.resultdet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 测评结果查看列表
export function getResultList2 (parameter) {
  return axios({
    url: URL.bdURL + api.resultlist2,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 测评题目列表
export function getSubjectList (parameter) {
  return axios({
    url: URL.bdURL + api.subjectlist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}