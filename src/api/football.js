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

/*  商品列表  */
export function getGoodsList (data = {
}) {
    return post("/football/matches", data)
}
/*  比赛订阅  */
export function setsubscribeOperate (data = {
}) {
    return post("/football/subscribe", data)
}
/*  修改比分  */
export function setScoreOperate (data = {
}) {
    return post("/football/modify/result", data)
}
/*  查询列表  */
export function getsearchList (data = {
}) {
    return get("/football/match/search", data)
}
