import Mock from 'mockjs'
import userAPI from './user'

Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// User
Mock.mock(/\/login/, 'post', userAPI.login)
Mock.mock(/\/userinfo/, 'get', userAPI.getInfo)

export default Mock