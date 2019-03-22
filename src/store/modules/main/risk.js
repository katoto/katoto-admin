import { goodsReview, goodsList, userlist } from '@/api/main/risk'
import { getCk, setCk, removeCk } from '@/utils/auth'

const mailmsg = {
    state: {
    },
    mutations: {
    },
    actions: {
        // 兑换审核
        risk_goodsReview({ commit }, obj) {
            return new Promise((resolve, reject) => {
                goodsReview(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        risk_goodslist({ commit }, obj) {
            return new Promise((resolve, reject) => {
                goodsList(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        risk_userlist({ commit }, obj) {
            return new Promise((resolve, reject) => {
                userlist(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        }         
    }
}

export default mailmsg
