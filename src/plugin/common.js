
const MyPlugin = {}

MyPlugin.install = function (Vue) {
    Vue.prototype.filterTableData = (pageno, pagesize, index) => {
        pageno = Number(pageno)
        pagesize = Number(pagesize)
        return (index >= (pageno - 1) * pagesize) && (index <= (pageno - 1) * pagesize + (pagesize - 1))
    }
}

export default MyPlugin