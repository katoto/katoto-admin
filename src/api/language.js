import request from '@/utils/request'

// 多语言
export function languageFilter(obj) {
  return request({
    url: '/admin/language/filter',
    method: 'post',
    data: {
        ...obj
	  }
  })
}

export function getInfo(ck) {
  return request({
    url: '/admin/user/info',
    method: 'get',
    params: { ck }
  })
}
