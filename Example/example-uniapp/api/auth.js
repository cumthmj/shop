import {
	request
} from './server.js'

export const login=
  function(params) {//手机号登录
    return request.post('/auth/login',params)
    .then(data=>{return data.data})
  }

export const currentUser =
	function(params) { //手机号登录
		return request.get('/auth/user')
			.then(data => {
				return data.data
			})
	}
export const logout =
	function(params) { //销毁令牌
		return request.get('/auth/logout')
			.then(data => {
				return data.data
			})
	}
