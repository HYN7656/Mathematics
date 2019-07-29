import { axios } from '@/utils/request'
import URL from './app-config'

const api = {
  txt:'teragdet.json',
}

export default api
// 获取轮播图列表 parameter: { pageSize: 10, pageNo: 1 }
export function getTerTxt (parameter) {
  return axios({
    url: URL.bdURL + api.txt,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}
