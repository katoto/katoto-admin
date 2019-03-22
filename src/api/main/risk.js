import request from '@/utils/request'
let post = (url, data) => request({url, data, method: 'post'})
let get = (url, data) => request({url, params: data, method: 'get'})

// 商品审核
export function goodsReview(data = {}) {
    return post('/admin/goods/review', data)
}

// 商品审核列表
export function goodsList(data = {}) {
    return post('/admin/goods/list/review', data)
}

// 用户list
export function userlist(data = {}) {
    return post('/user/info/list', data)
}
