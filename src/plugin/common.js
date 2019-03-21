
const MyPlugin = {}
import { Message } from 'element-ui'

MyPlugin.install = function (Vue) {
    Vue.prototype.filterTableData = (pageno, pagesize, index) => {
        pageno = Number(pageno)
        pagesize = Number(pagesize)
        return (index >= (pageno - 1) * pagesize) && (index <= (pageno - 1) * pagesize + (pagesize - 1))
    }

    Vue.prototype.error = message => {
        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
    }

    Vue.prototype.success = (message = '操作成功') => {
        Message({
            message: message,
            type: 'success',
            duration: 5 * 1000
        })
    }
}

export default MyPlugin