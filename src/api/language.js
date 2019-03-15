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

export function languageadd(obj) {
  return request({
    url: '/admin/language/add',
    method: 'post',
    data: {
      ...obj
    }
  })
}
