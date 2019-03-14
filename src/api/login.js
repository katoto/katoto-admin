import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(ck) {
  return request({
    url: '/userinfo',
    method: 'get',
    params: { ck }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
