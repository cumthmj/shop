import {
	request
} from './server.js'

export const product =
	function(params) { //商品列表
		return request.post('/product/app/page', params)
			.then(data => {
				return data.data
			})
	}

export const productDetail =
	function(params) { //商品详情
		return request.post('/product/app/detail?productId=' + params)
			.then(data => {
				return data.data
			})
	}
