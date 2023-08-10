<template>
	<view>
		<view>
			<u-sticky>
				<view style="background-color: #ffffff;">
					<u-search shape="round" placeholder="请输入商品名称" v-model="listQuery.productName" @clear="res=>{listQuery.productName='';resultProduct()}" @custom="resultProduct()" @search="resultProduct()"></u-search>
				</view>
			</u-sticky>
			<u-sticky offset-top="55">
				<view style="background-color: #ffffff;">
					<u-dropdown ref="uDropdown" @open="openDropDown" @close="closeDropDown">
						<u-dropdown-item title="分类" :options="categories" >
							<view class="slot-content">
								<view style="display: flex;flex-wrap: wrap;background-color: white;">
									<u-tag :text="item.label" class="u-margin-4" shape="circle" :mode="tagIndex == index?'dark':'plain'" @click="tagClick(index)" v-for="(item, index) in categories" :key="index" />
								</view>
							</view>
						</u-dropdown-item>
					</u-dropdown>
				</view>
			</u-sticky>
		</view>
		<view>
			<!-- 商品列表 -->
			<product :colors="colors" :dataList="products" :loading="loading"></product>
			<!-- 右侧悬浮菜单栏 -->
			<suspension :scrollShow="scrollShow" :colors="colors"></suspension>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	import Product from './components/product/product.vue';
	import Suspension from './components/suspension/suspension.vue';
	import {categorie} from '@/api/category.js'
	import {product,productDetail} from '@/api/product.js'
	export default {
		components:{
			Product,
			Suspension
		},
		data() {
			return {
				userInfo: {},
				show:true,
				scrollShow: false, //是否显示悬浮菜单
				colors:"",
				categories:[],
				listQuery:{
					current:1,
					total:0,
					size:4
				},
				score:0,
				tagIndex:0,
				loading:true,
				products: []
			}
		},
		onLoad() {
			this.colors = app.globalData.newColor;
			this.getCategories();
			this.getProduct();
		},
		onShow() {
			setTimeout(res=>{
				//消除隐藏的模态框,不然会出现无法拖动下滑的问题
				this.$refs.uDropdown.contentHeight = 0;
			},300)
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {
			var _this = this;
			//说明还有剩余的数据
			if(_this.listQuery.total>_this.listQuery.current*_this.listQuery.size){
				_this.loading = true;
				_this.listQuery.current++;
				_this.getProduct();
			}else{
				_this.loading = false
			}
		},
		methods: {
			/**
			 * 获取所有的商品类别
			 */
			getCategories(){
				categorie().then(res=>{
					if(res.data){
						this.categories = res.data;
						this.categories.forEach(element=>{
							element.label=element.categoryName,
							element.value = element.categoryId
						})
						var data = {
							label:"全部",
							value:""
						}
						this.categories.unshift(data);
					}
				})
			},
			/**
			 * 获取商品
			 */
			getProduct(){
				product(this.listQuery).then(res=>{
					if(res.data){
						this.products = this.products.concat(res.data.records);
						this.listQuery.total = parseInt(res.data.total);
						if(this.listQuery.total>this.listQuery.current*this.listQuery.size){
							this.loading = true;
						}else{
							this.loading = false;
						}
					}
				})
			},
			/**
			 * 刷新商品
			 */
			resultProduct(){
				this.listQuery.current=1;
				this.products = [];
				this.getProduct();
			},
			onPageScroll: function(e) {
				if (e.scrollTop >= 500) {
					this.scrollShow = true
				} else {
					this.scrollShow = false;
				}
			},
			to(url) {
				uni.navigateTo({
					url
				})
			},
			tagClick(e){
				this.listQuery.categoryId = this.categories[e].categoryId;
				this.tagIndex = e;
				this.$refs.uDropdown.close();
				this.resultProduct();
			},
			openDropDown(e){
				this.$refs.uDropdown.contentHeight = 1000;
			},
			closeDropDown(e){
				this.$refs.uDropdown.contentHeight = 0
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #ededed;
}

.camera{
	width: 54px;
	height: 44px;
	
	&:active{
		background-color: #ededed;
	}
}
.user-box{
	background-color: #fff;
}

.list {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 2.67vw;

		>view {
			width: 25%;
			height: 25vw;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 3.2vw;

			>image {
				width: 12vw;
				height: 12vw;
				margin-bottom: 2.67vw;
			}
		}
	}
</style>
