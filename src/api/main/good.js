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

export function getGoodList (data = {
}) {
    return post("/admin/goods/config/list", data)
}

export function setGood (data = {
}) {
    return post("/admin/goods/config/modify", data)
}

export function changeLine (data = {
}) {
    return post("/admin/goods/config/onsale", data)
}

export function virtualGoodList (data = {
}) {
    return get("/admin/goods/immaterial/list", data)
}

export function virtualGoodImport (data = {
}) {
    return post("/admin/goods/immaterial/add", data)
}

export function deleteVirtualGood (data = {
}) {
    return post("/admin/goods/immaterial/delete", data)
}

export function virtualGoodModify (data = {
}) {
    return post("/admin/goods/immaterial/modify", data)
}

export function getMaterialList (data = {
}) {
    return get("/admin/goods/material/list", data)
}

export function materialModify (data = {
}) {
    return post("/admin/goods/material/modify", data)
}
