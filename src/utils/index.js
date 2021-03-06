/**
 * Created by jiachenpan on 16/11/18.
 */

export function parseTime (time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}"
    let date
    if (typeof time === "object") {
        date = time
    } else {
        if (("" + time).length === 10) {time = parseInt(time) * 1000}
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === "a") {return ["一", "二", "三", "四", "五", "六", "日"][value - 1]}
        if (result.length > 0 && value < 10) {
            value = "0" + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime (time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return "刚刚"
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + "分钟前"
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + "小时前"
    } else if (diff < 3600 * 24 * 2) {
        return "1天前"
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + "月" + d.getDate() + "日" + d.getHours() + "时" + d.getMinutes() + "分"
    }
}

export function namespace (ns) {
    return (name) => [ns, name].join("/")
}

export const platform = (function () {
    return ~navigator.userAgent.indexOf("iPhone") ? "ios" : "android"
})()

export function mapTypes (array, ns) {
    const result = {
    }
    array.forEach(item => {
        result[item] = [ns, item].join("/")
    })
    return result
}

export function mapActions (acts, ns) {
    let aTypes = {
    }
    let actions = {
    }
    Object.keys(acts).forEach((key) => {
        aTypes[key] = [ns, key].join("/")
        actions[aTypes[key]] = acts[key]
    })
    return {
        actions,
        aTypes
    }
}

export function mapMutations (muts, ns) {
    let mTypes = {
    }
    let mutations = {
    }
    Object.keys(muts).forEach((key) => {
        mTypes[key] = [ns, key].join("/")
        mutations[mTypes[key]] = muts[key]
    })
    return {
        mutations,
        mTypes
    }
}
/*
 *   金币类型
 * */
export function formateCoinType (type = "2001") {
    type = type.toString()
    switch (type) {
    case "2001":
        return "ETH"
    case "1001":
        return "BTC"
    case "2000":
        return "CC"      
    default:
        return "ETH"
    }
}

export function formatCoinTime (time, format = "yyyy-MM-dd") {
    let t = new Date(time)
    let tf = function (i) {
        return (i < 10 ? "0" : "") + i
    }
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
        case "yyyy":
            return tf(t.getFullYear())
        case "MM":
            return tf(t.getMonth() + 1)
        case "mm":
            return tf(t.getMinutes())
        case "dd":
            return tf(t.getDate())
        case "HH":
            return tf(t.getHours())
        case "ss":
            return tf(t.getSeconds())
        }
    })
}

export function formatCommonTime () {
    return formatCoinTime.apply(this, arguments)
}

export const src = "pc"
