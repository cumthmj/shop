<template>
   <!-- 弹出规格选项 -->
    <view class="popup">
      <view class="mask" @touchmove.stop.prevent="moveHandle" v-if="showModal" @tap="onhide"></view>
      <view @touchmove.stop.prevent="moveHandle" :class="'sku ' + (showModal==true ? 'shows':'')" :style="{bottom: showModal == true ? bottoms+'upx': ''}">
        <view class="sku_top">
          <image :src="currentSku.imageUrls&&currentSku.imageUrls.length>0?currentSku.imageUrls[0].cosUrl:'/static/img/noProduct.png'" class="top_img"></image>
          <view class="sku_title">
           {{nowList.productName}}
          </view>
          <view class="moneys">
            {{(Number(currentSku.price) * number).toFixed(0)}}元
          </view>
		  <view style="display: flex;justify-content: space-between;">
			  <view class="kucun">
			    库存: {{currentSku.stock}}
			  </view>
		  </view>
        </view>
          <view class="number">
            <view class="n_left">购买数量</view>
            <view class="n_right">
			  <u-number-box v-model="number" :min="1" :max="currentSku.stock"></u-number-box>
            </view>
          </view>
          <view class="btn_box">
            <view class="addcart_btn" :style="'background-color:' + colors" @tap="onsubmit('add')">加入购物车</view>
            <view class="submit" :style="'background-color:' + colors" @tap="onsubmit('pay')">立即购买</view>
          </view>
      </view>
    </view>
</template>

<script>
import {getCart, setCart , setGoodsData, getToken} from '@/utils/index.js'
import {request} from '@/api/server.js'
export default {
  data() {
    return {
      number: 1,
      current: "",
	  currentArr:[], //当前选中的规格数组
	  currentSku:{}, //选择后的规格详情
	  skulength: 0, //选择商品规格的长度
	  issku: false ,//判断当前商品是否存在规格
	  update: true,
	  nowList:{}
    };
  },
  components: {},
  props: {
    colors: {
      type: String
    },
    showModal: {
      type: Boolean,
      default: false
    },
    skuList: {
      type: Object
    },
	bottoms:{
	  type: String,
	  default: 0
	}
  },
  computed:{
	  skuArr() {
	  	return this.skuList.skuArr;
	  }
  },
  watch:{
	skuList(value){//监听商品规格变化 来清空之前所选的规格
		this.currentArr = []
		this.issku = false //初始化当前规格的条件
		this.number = 1 //初始数量
		this.skulength = 0 //初始化商品规格长度
		this.currentSku = value
		this.nowList = value
	}  
  },
  methods: {
   moveHandle(){
	 return  
   },
    onhide() {
      //隐藏规格对话框
	  this.$emit('onhide')
    },
    onsubmit(value) {
    	//此处应调用接口来添加购物车 现模拟添加到购物车
    	var datas = this.nowList
		datas.number = this.number
		if(value == 'add'){ //如果是添加购物车
			var data = {
				productId:this.nowList.productId,
				buyCount:this.number
			}
			request.post("/shopcarts",data).then(res=>{
				if(res.code==0){
					// 存储商品数据
					uni.showToast({
					  title: '加入购物车成功 !',
					  icon: 'none'
					});
				}
			})
		}else{ //如果是购买商品
			let goods = []
			datas.img = datas.imageUrls&&datas.imageUrls.length>0?datas.imageUrls[0].cosUrl:'/static/img/noProduct.png';
			goods.push(datas)
			uni.navigateTo({  //提交订单
				url:'/shop/pages/order/confirmOrder?products='+encodeURIComponent(JSON.stringify(goods))
			})
		}
        setTimeout(() => {
		  this.$emit('onhide')
        }, 300);
    }
  }
};
</script>
<style scoped lang="scss">
.mask{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 900;
  opacity: 0.7;
}
.sku{
  width: 100vw;
  min-height: 30vh;
  position: fixed;
  bottom: -100%;
  z-index: 910;
  left: 0;
  background-color: #ffffff;
  padding: 20upx 4%;
  border-top-left-radius: 10upx;
  border-top-right-radius: 10upx;
  border-bottom: 1upx solid #eee;
  transition: all 0.3s;
}
.shows{
  bottom: 0;
  transition: all 0.3s;
}
.sku_top{
  overflow: hidden;
  margin-top: 20upx;
}
.sku_top .top_img{
  height: 170upx;
  width: 170upx;
  float: left;
  margin-right: 15upx;
  border-radius: 8upx;
}
.sku_top .sku_title{
  font-size: 30upx;
  line-height: 35upx;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.sku_top .moneys{
  font-size: 30upx;
  line-height: 40upx;
  overflow: hidden;
  margin-top: 20upx;
  font-weight: bold;
  color: $mycolor;
}
.sku_top .kucun{
  font-size: 24upx;
  color: #999;
  overflow: hidden;
}
.sku_list{
  margin-top: 20upx;
  overflow: hidden;
  margin-bottom: 40upx;
}
.sku_name{
  font-size: 24upx;
  color: #666;
  overflow: hidden;
}
.sku_tag{
  overflow: hidden;
  margin-top: 20upx;
}
.sku_tag .tag_s{
  height: 60upx;
  line-height: 60upx;
  align-items: center;
  padding: 0 20upx;
  text-align: center;
  font-size: 26upx;
  color: #202020;
  background-color: #F5F5F5;
  border: 1upx solid #F5F5F5;
  float: left;
  border-radius: 40upx;
  margin-right: 20upx;
  transition: all 0.2s;
  margin-bottom: 20upx;
  font-weight: 500;
  &::after{
	  border: none;
  }
}
.number{
  margin-top: 10upx;
  border-top: 1upx solid #ccc;
  width: 100%;
  height: 80upx;
  line-height: 80upx;
  padding-top: 10upx;
}
.number .n_left{
  float: left;
  font-size: 28upx;
  color: #333;
}
.number .n_right{
  float: right;
  border-radius: 5upx;
}
.n_right .jian,.jia{
  width: 60upx;
  height: 60upx;
  text-align: center;
  line-height: 60upx;
  font-size: 42upx;
}
.jian{
  float: left;
}
.jia{
  float: right;
}
.jian:active{
  background-color: #eee;
}
.jia:active{
  background-color: #eee;
}
.n_right .inputs{
  width: 76upx;
  float: left;
  text-align: center;
  margin-top: 6upx;
}
.btn_box{
  margin-top: 40upx;
}
.btn_box .addcart_btn, .submit{
  width: 40vw;
  height: 60upx;
  line-height: 60upx;
  border-radius: 42upx;
  font-size: 26upx;
  text-align: center;
  color: #ffffff;
  float: left;
  margin-left: 30upx;
  margin-bottom: 30upx;
}
.btn_box .addcart_btn:active{
  opacity: 0.8;
}
.btn_box .submit:active{
  opacity: 0.8;
}
.ondisabled{
	background-color: #F9F9F9;
	opacity: 0.5;
}
</style>