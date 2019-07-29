import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  listManagerslist:'ListManagerslist.json',
  listManagersdet:'ListManagerslist.json',
  listManagersadd:'ListManagersdet.json',
  listManagersedit:'ListManagersdet.json',
  Journallist:'Journallist.json',
  Rolelist:'Rolelist.json',
  Roledet:'Rolelist.json',
  Roleadd:'Roledet.json',
  Roleedit:'Roledet.json',

}
/********************管理员列表***********************/
export default api
// 管理员列表 parameter: { pageSize: 10, pageNo: 1 }
export function getListManagersList (parameter) {
  return axios({
    url: URL.bdURL + api.listManagerslist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 管理员删除 parameter: { pageSize: 10, pageNo: 1 }
export function getListManagersDet (parameter) {
  return axios({
    url: URL.bdURL + api.listManagersdet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 管理员添加 parameter: { pageSize: 10, pageNo: 1 }
export function getListManagersAdd (parameter) {
  return axios({
    url: URL.bdURL + api.listManagersadd,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 管理员编辑 parameter: { pageSize: 10, pageNo: 1 }
export function getListManagersEdit (parameter) {
  return axios({
    url: URL.bdURL + api.listManagersedit,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
/********************系统日志***********************/
// 系统日志列表
export function getJournalList (parameter) {
  return axios({
    url: URL.bdURL + api.Journallist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

/********************角色管理***********************/
// 角色管理列表
export function getRoleList (parameter) {
  return axios({
    url: URL.bdURL + api.Rolelist,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 角色管理删除
export function getRoleDet (parameter) {
  return axios({
    url: URL.bdURL + api.Roledet,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 角色管理新增
export function getRoleAdd (parameter) {
  return axios({
    url: URL.bdURL + api.Roleadd,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 角色管理编辑
export function getRoleEdit (parameter) {
  return axios({
    url: URL.bdURL + api.Roleedit,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
