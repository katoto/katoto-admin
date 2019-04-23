import {
    languageFilter, languageadd, languagedel,
    languagemodify 
} from "@/api/language"
import {
    getCk, setCk, removeCk 
} from "@/utils/auth"

const language = {
    state: {
    },

    mutations: {
    },

    actions: {
    // 多语言
        languagePage ({
            commit 
        }, obj) {
            return new Promise((resolve, reject) => {
                languageFilter(obj).then(response => {
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 语言上传
        languageAdd ({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                languageadd(data).then(res => {
                    resolve(res.data)
                })
            })
        },
        // 语言删除
        languageDel ({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                languagedel(data).then(res => {
                    resolve(res.data)
                })
            })
        },
        // 语言修改
        languageModify ({
            commit
        }, data) {
            return new Promise((resolve, reject) => {
                languagemodify(data).then(res => {
                    resolve(res.data)
                })
            })
        }    
    }
}

export default language
