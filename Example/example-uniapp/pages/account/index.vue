<template>
	<view>
		<my-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="content">我的</block>
		</my-custom>
		我的
		<view >用户Id：{{user.userId}}</view>
		<view >姓名：{{user.username}}</view>
		<view >手机号：{{user.phoneNumber}}</view>
		<button  @tap="logout">注销</button>
		<my-component-tabar />
	</view>
</template>

<script>	
	import * as auth from '@/api/auth.js'
	export default {
		data() {
			return {
				user:{}				
			}
		},		
		onShow(option) {
			auth.currentUser().then(res=>{
				console.log(res.data)
				this.user=res.data
			});
		},
		methods: {
			logout() {
				auth.logout();
				//清除token：lifeData
				uni.setStorageSync("lifeData","")
				uni.navigateTo({
					url:"../login/login/index"
				})
			}
		}
	}
</script>

<style>

</style>
