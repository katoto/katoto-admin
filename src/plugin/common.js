
const MyPlugin = {
}
import {
    Message
} from "element-ui"

MyPlugin.install = function (Vue) {
    Vue.prototype.error = message => {
        Message({
            message: message,
            type: "error",
            duration: 5 * 1000
        })
    }

    Vue.prototype.success = (message = "操作成功") => {
        Message({
            message: message,
            type: "success",
            duration: 5 * 1000
        })
    }

    Vue.prototype.$load = function (message = "Loading") {
        return this.$loading({
            lock: true,
            text: message,
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
        })
    }
}

export default MyPlugin
