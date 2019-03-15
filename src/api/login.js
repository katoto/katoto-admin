import request from '@/utils/request'

// 登陆 & userinfo
export function login(username, password) {
  return request({
    url: 'admin/user/login',
    method: 'post',
    data: {
      username,
      password
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
