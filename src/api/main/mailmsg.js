import request from "@/utils/request"

// notice
export function noticeadd (obj) {
    return request({
        url: "/admin/notice/add",
        method: "post",
        data: {
            ...obj
        }
    })
}

// 通知列表
export function noticelist (obj) {
    return request({
        url: "/admin/notice/filter",
        method: "post",
        data: {
            ...obj
        }
    })
}
