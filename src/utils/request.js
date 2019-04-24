import axios from "axios"
import {
    Message, MessageBox, Loading
} from "element-ui"
import store from "../store"
import {
    getCk
} from "@/utils/auth"

let loadingInstance = null

function getCommonParams () {
    let ck = getCk() || ""
    return {
        ck
    }
}

// 创建axios实例
// 在config 配置
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 65000 // 请求超时时间
})

// request 拦截器
service.interceptors.request.use(
    config => {
        if(config && config.method !== 'OPTION' && config.method !== "option"){
            loadingInstance = Loading.service()
        }
        if (config.params) {
            config.params = {
                ...getCommonParams(),
                ...config.params
            }
        }
        if (config.data) {
            config.data = {
                ...getCommonParams(),
                ...config.data
            }
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        loadingInstance.close();
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.status !== "100") {
            Message({
                message: res.message,
                type: "error",
                duration: 5 * 1000
            })
            // 50008:非法的; 50012:其他客户端登录了; todo
            if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
                MessageBox.confirm(
                    "你已被登出，可以取消继续留在该页面，或者重新登录",
                    "确定登出",
                    {
                        confirmButtonText: "重新登录",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                ).then(() => {
                    store.dispatch("FedLogOut").then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })

            }
            return Promise.reject("error")
        } else {
            return response.data
        }
    },
    error => {
        console.log("err" + error) // for debug
        Message({
            message: error.message,
            type: "error",
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
