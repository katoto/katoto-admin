import {
    noticeadd, noticelist 
} from "@/api/main/mailmsg"
import {
    getCk, setCk, removeCk 
} from "@/utils/auth"

const mailmsg = {
    state: {
        aa: null
    },
    mutations: {
        setUserinfo: (state, info) => {
            state.userinfo = info
        }
    },
    actions: {
        // 发送站内信
        noticeAdd ({
            commit 
        }, obj) {
            return new Promise((resolve, reject) => {
                noticeadd(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        noticeList ({
            commit 
        }, obj) {
            return new Promise((resolve, reject) => {
                noticelist(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        }        
    }
}

export default mailmsg
