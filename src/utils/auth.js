import Cookies from 'js-cookie'

const ckKey = 'ms-adminck'

export function getCk() {
    return Cookies.get(ckKey)
}

export function setCk(ck) {
    return Cookies.set(ckKey, ck)
}

export function removeCk() {
    return Cookies.remove(ckKey)
}
