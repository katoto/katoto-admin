import {
    param2Obj 
} from "@/utils/utils"

const tokens = {
    admin: {
        ck: new Date().getTime()
    }
}

export default {
    login: res => {
        const {
            username 
        } = JSON.parse(res.body)
        const data = tokens[username]
        if (data) {
            return {
                status: "200",
                data
            }
        }
        return {
	  status: "201",
            message: "Account and password are incorrect."
        }
    },
    getInfo: res => {
        const {
            ck 
        } = param2Obj(res.url)
        let info = null
        if (ck) {
            info = {
                "uid": 11,
                "email": "mockjs@pmbdbr.cq"
            }
        }
        if (info) {
            return {
                status: "200",
                data: info
            }
        }
        return {
            code: "201",
            message: "Login failed, unable to get user details."
        }
    },
    logout: () => {
        return {
            code: 20000,
            data: "success"
        }
    }
}
