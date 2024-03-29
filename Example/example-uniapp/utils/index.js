export const groupArray = function (array, subGroupLength) {
    let index = 0;
    let newArray = [];
    while(index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
    }
    return newArray;
}
export const ColorUI = {
  Blue: '#0081ff',
  Cyan: '#1cbbb4',
  Yellow: '#fbbd08',
  Olive: '#8dc63f',
  Orange: '#f37b1d',
  Purple: '#6739b6',
  Brown: '#a5673f',
  Red: '#e54d42'
}
export const analysisColor = ['#1cbbb4','#8dc63f','#f37b1d','#a5673f']

/**
 * 项目主题颜色
 */

export function setConfig(value) {
  try {
    let config = JSON.stringify(value);
    uni.setStorageSync('config', config);
    console.log('存储主题成功');
  } catch (e) {
    return;
  }
}
export function getConfig() {
  let config = uni.getStorageSync('config');

  if (config) {
    return JSON.parse(config);
  }
}
/**
 * 获取推荐人id
 */

export function setRecommend(value) {
  uni.setStorageSync('recommend', value);
  console.log('recommend', value);
}
export function getRecommend() {
  let recommend = uni.getStorageSync('recommend');
  return recommend;
}
/**
 * 存储商品信息
 */

export function setGoodsData(value) {
  try {
    let newValue = JSON.stringify(value);
    uni.setStorageSync('goodsdata', newValue);
    console.log('存储商品信息成功');
  } catch (e) {
    return;
  }
}
export function getGoodsData() {
  let goodsdata = uni.getStorageSync('goodsdata');

  if (goodsdata) {
    return JSON.parse(goodsdata);
  }
} 
// 存储用户地址
export function setAddress(value) {
  try {
    let newValue = JSON.stringify(value);
    uni.setStorageSync('address', newValue);
    console.log('存储地址信息成功', newValue);
  } catch (e) {
    return;
  }
}
export function getAddress() {
  let address = uni.getStorageSync('address');

  if (address) {
    return JSON.parse(address);
  }
}
export function removeAddress() {
  uni.removeStorageSync('address');
} // 设置分类跳转

export function setTbIndex(value) { //设置菜单栏选项
  uni.setStorageSync('tabIndex', value);
  console.log('tabIndex', value);
}
export function getTbIndex() { //获取菜单栏选项
  let tabIndex = uni.getStorageSync('tabIndex');
  return tabIndex;
}
export function removeTbIndex() { //移除菜单栏选项
  uni.removeStorageSync('tabIndex');
}
export function setlocation(value){ //存储位置信息
	try {
	  let newValue = JSON.stringify(value);
	  uni.setStorageSync('location', newValue);
	  console.log('存储地址信息成功', newValue);
	} catch (e) {
	  return;
	}
}
export function getlocation() { //获取位置信息
  let location = uni.getStorageSync('location');
  if (location) {
    return JSON.parse(location);
  }
}
export function setCart(value){ //模拟存储购物车数据
	try {
	  let data = getCart() || []
	  data.push(value)
	  let newValue = JSON.stringify(data);
	  uni.setStorageSync('cart', newValue);
	  console.log('存储购物车数据成功', newValue);
	} catch (e) {
	  return;
	}
}
export function getCart() { //模拟获取购物车数据
  let cart = uni.getStorageSync('cart');
  if (cart) {
    return JSON.parse(cart);
  }
}
export function removeCart() { //模拟删除购物车数据
  uni.removeStorageSync('cart')
}
export function setPickaddress(value){ //存储收件地址
	try {
	  let newValue = JSON.stringify(value);
	  uni.setStorageSync('pickaddress', newValue);
	  console.log('存储收件地址信息成功', newValue);
	} catch (e) {
	  return;
	}
}
export function getPickaddress() { //获取收件地址
  let location = uni.getStorageSync('pickaddress');
  if (location) {
    return JSON.parse(location);
  }
}
export function removePickaddress() { //删除收件地址
  uni.removeStorageSync('pickaddress')
}
export function setToaddress(value){ //存储取件地址
	try {
	  let newValue = JSON.stringify(value);
	  uni.setStorageSync('toaddress', newValue);
	  console.log('存储取件地址信息成功', newValue);
	} catch (e) {
	  return;
	}
}
export function getToaddress() { //获取取件地址
  let location = uni.getStorageSync('toaddress');
  if (location) {
    return JSON.parse(location);
  }
}
export function removeToaddress() { //删除取件地址
  uni.removeStorageSync('toaddress')
}