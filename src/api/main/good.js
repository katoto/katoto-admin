import request from '@/utils/request'


export function getGoodList(data = {}) {
    return request({
        url: '/admin/goods/config/list',
        method: 'post',
        data: data
    })
}

export function setGood (data = {}) {
    return request({
        url: '/admin/goods/config/modify',
        method: 'post',
        data: data
    })
}
