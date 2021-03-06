import request from "@/utils/request"
let post = (url, data) => request({
    url,
    data,
    method: "post"
})
let get = (url, data) => request({
    url,
    params: data,
    method: "get"
})

// 商品审核
export function goodsReview (data = {
}) {
    return post("/admin/goods/review", data)
}

// 商品审核列表
export function goodsList (data = {
}) {
    return post("/admin/goods/list/review", data)
}

// 用户list
export function userlist (data = {
}) {
    return post("/user/info/list", data)
}

export function accountinf (data = {
}) {
    return post("/user/account/info", data)
}

export function logs (data = {
}) {
    return post("/user/account/logs", data)
}

export function sumlogs (data = {
}) {
    return post("/user/account/summary", data)
}

export function uslevel (data = {
}) {
    return post("/user/level/update", data)
}

// 广告配置列表
export function adList (data = {
}) {
    return get("/admin/activity/config/list", data)
}
export function ad_modify (data = {
}) {
    return post("/admin/activity/config/modify", data)
}
