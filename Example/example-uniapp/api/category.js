import {
	request
} from './server.js'

export const categorie =
	function(params) { //获取商品分类
		return request.post('/categories/vo/list')
			.then(data => {
				return data.data
			})
	}
