<template>
	<view class="goodsDetails">
		<!-- 轮播图 -->
		<view v-if="product.imageUrls && product.imageUrls.length>0">
			<u-swiper :list="product.imageUrls" name="cosUrl" img-mode="aspectFit" :height="424"></u-swiper>
		</view>
		<!-- 商品信息 -->
		<view class="goods_info">
			<view class="goods_name">
				{{product.productName}}
			</view>
			<view class="goods_price" style="display: flex;justify-content: space-between;">
				<text class="money">{{product.price}}元</text>
				<text style="color: #999;font-size: 24upx;margin-right: 5px;">库存: {{product.stock}}</text>
				<text style="color: #999;font-size: 24upx;">销量:{{product.saleCount}}</text>
			</view>
		</view>
		<!-- 商品详细信息 -->
		<view class="u-content">
			<u-parse :html="product.introduction" :show-with-animation="true"></u-parse>
		</view>
		<!-- 底部操作栏 -->
		<view class="operation">
			<view class="cart" >
				<u-icon size="40" name="shopping-cart"></u-icon>
			</view>
			<view class="btns" style="margin-left: 40px;">
				<view class="addcart" :style="'border-color:' + colors + ';color:' + colors" @tap="openSku">
					加入购物车
				</view>
				<view class="dingjin" :style="'background:' + colors" @tap="openSku">
					立 即 购 买
				</view>
			</view>
		</view>
		<!-- 选择商品 -->
		<sku :skuList="nowList" :showModal="showModal" :colors="colors" @onhide="onhide" bottoms="0"></sku>
		<!-- 返回顶部按钮 -->
		<view class="go_top" :style="'right: ' + (scrollShow == true ? '3%':'-200upx')">
			<view class="ontop" @tap="goTop">
				<image src="/static/img/TOP.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	import Sku from '../home/components/sku/sku.vue'
	import {productDetail} from '@/api/product.js'
	export default {
		data() {
			return {
				colors: '',
				productId:"",
				scrollShow: false,
				showModal:false,
				store:{},
				product:{},
				nowList:{}
			};
		},
		components: {
			Sku
		},
		props: {
			
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			//主题颜色
			this.colors = app.globalData.newColor;
			//获取商品id
			this.productId = options.productId;
			//获取商品信息
			this.getProduct();
			
			setTimeout(() => {
				this.isShow = false;
			}, 600);
			// #ifdef APP-PLUS
			this.toBar = app.globalData.toBar + 25 + 'px'
			// #endif
			this.newVideo = uni.createVideoContext('newVideo');
		},
		/**
		 * 生命周期函数--监听页面滚动
		 */
		onPageScroll: function(e) {
			if (e.scrollTop >= 400) {
				this.scrollShow = true
			} else {
				this.scrollShow = false
			}
		},
		methods: {
			/**
			 * 获取商品的信息
			 */
			getProduct(){
				productDetail(this.productId).then(res=>{
					if(res.data){
						this.product = res.data;
						console.log(this.product);
					}
				})
			},
			//打开购物车
			openSku() {
				this.nowList = this.product
				this.showModal = true
			},
			//关闭购物车
			onhide(){
				this.showModal = false
			},
			goTop() { //返回顶部
				uni.pageScrollTo({
					scrollTop: 0
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	@import "./goodsDetails.scss";
	/deep/.rich-img {
		width: 100%;
		height: auto;
	}
</style>
