<template>
	<view class="shopnote_container">
		<view id="sticky" :class="{wxMenuFix:isWxMenuFix}">
			<view  class="top">
				<view class="left">
					<view class="logo_img">
						<image src="../../static/image/logo.webp" mode=""></image>
					</view>
					<view class="">
						<text>吃货研究所店铺</text>
						<view class="three_img">
							<image src="../../static/image/3年.png" mode=""></image>
						</view>	
					</view>
				</view>
				
				<view class="right">
					<view class="red">进店</view>
				</view>
			</view>
		</view>
		
		<view class="info" v-for="item in ShopnoteData" :key="item.noteId" >
			<view class="day">
				{{item.publishTime }}
			</view>
			<view class="title">
				{{item.title}}
			</view>
			<view class="shopkeeper">
				#掌柜说#
			</view>
			<view class="imgList" >
				
				<view v-if="item.coverPhotos.length !== 0" class="img" v-for="img in item.coverPhotos" :key="img">
					<image :src="img" mode=""></image>
				</view>
				<view v-if="item.coverPhotos.length === 0" class="img"  v-for="index in item.noteItemsBriefInfo" :key="index.imageUrl">
					<image :src="index.imageUrl" mode=""></image>
				</view>
			</view>
			
		</view>
		<view v-if="isEmpty" class="base">
			·已经到底了·
		</view>
		<view v-else class="loading">
			<view class="img">
				<image src="../../static/easy-loadimage/loading.gif" mode=""></image>
			</view>
			正在加载
		</view>
		
	</view>
</template>

<script>
	
	import { getShopNote } from '../../api/index.js';
	export default {
		data() {
			return {
				isWxMenuFix: false,
				page:1,
				ShopnoteData:{},
				isEmpty:false 
			};
		},
		onReady() {
			const query = uni.createSelectorQuery();
			query.select('#sticky').boundingClientRect(data=>{
				this.menuTop = data.top
			}).exec();
		},
		onPageScroll(e) {
			var { scrollTop } = e;
			if(scrollTop > this.menuTop){
				this.isWxMenuFix = true;
			}else{
				this.isWxMenuFix = false;
			}
		},
		methods:{
			
			formatNumber(n) {
			  n = n.toString()
			  return n[1] ? n : '0' + n
			},
			formatTime(number,format) {
			 
			  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
			  var returnArr = [];
			 
			  var date = new Date(number * 1000);
			  returnArr.push(date.getFullYear());
			  returnArr.push(this.formatNumber(date.getMonth() + 1));
			  returnArr.push(this.formatNumber(date.getDate()));
			 
			  returnArr.push(this.formatNumber(date.getHours()));
			  returnArr.push(this.formatNumber(date.getMinutes()));
			  returnArr.push(this.formatNumber(date.getSeconds()));
			 
			  for (var i in returnArr) {
			    format = format.replace(formateArr[i], returnArr[i]);
			  }
			  return format;
			},
			async getShopnoteList(){
				var {status, data}  = await getShopNote(this.page);
				this.ShopnoteData = data;

				this.ShopnoteData.map((item)=>{
					item.publishTime = this.formatTime(item.publishTime,"M月D日")
				})
				
				console.log(this.ShopnoteData)
				
			},
			
		},
		created() {
			this.getShopnoteList()
			
		},
		async onReachBottom() {
			if(this.isEmpty === true){
				return
			}
			this.page++;
			var {status, data}  = await getShopNote(this.page);
			var newData = {}
			data.map((item)=>{
				item.publishTime = this.formatTime(item.publishTime,"M月D日")
			}) 
			newData = this.ShopnoteData.concat(data);
			
			if(newData.length <= this.ShopnoteData.length){
				console.log(newData.length)
				console.log(this.ShopnoteData.length)
				this.isEmpty = true
			}else{
				console.log(newData.length)
				console.log(this.ShopnoteData.length)
				this.isEmpty = false
			}
			this.ShopnoteData = newData
			console.log(this.ShopnoteData)
		}
		
		
	}
</script>

<style lang="scss" scoped>
 .shopnote_container{
	 background-color: #f9f9f9;
	 #sticky{
		.top{
		 	display: flex;
		 	align-items: center;
		 	justify-content: space-between;
		 	
		 	width: 100%;
		 	height: 128rpx;
		 	background-color: #FFFFFF;
		 	.left{
		 		display: flex;
		 		font-size: 32rpx;
		 		font-weight: 600;
		 		margin-left:24rpx;
		 		.logo_img{
		 			width: 96rpx;
		 			height: 96rpx;
		 		}
		 		.three_img{
		 			margin-top: 24rpx;
		 			width: 152rpx;
		 			height: 32rpx;
		 		}
		 		image{
		 			width: 100%;
		 			height: 100%;
		 		}
		 	}
		 	.right{
		 		width: 144rpx;
		 		height: 54rpx;
		 		border: 1px solid #FF0000;
		 		color: #ff0000;
		 		text-align: center;
		 		border-radius: 42rpx;
		 		margin-right: 24rpx;
		 		
		 	}
		 } 
	}
	
	.info{
		width: 700rpx;
		// height: 800rpx;
		margin: 20rpx;
		padding: 10rpx;
		background-color: #fff;
		font-size: 32rpx;
		margin-top: 10rpx;
		margin-bottom: 20rpx;
		.day{
			font-size: 24rpx;
			color:#CCCCCC;
			margin-bottom: 20rpx;
		}
		.title{
			font-weight: 600;
			margin-bottom: 20rpx;
		}
		.shopkeeper{
			color: #ff4444;
			font-size: 22rpx;
			margin-bottom: 20rpx;
		}
		.imgList{
			width: 800rpx;
			display: flex;
			flex-wrap: wrap;
			.img{
				margin-bottom: 16rpx;
				margin-right: 16rpx;
				width: 220rpx;
				height: 240rpx;
			}
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
 }
 .base{
	 text-align: center;
	 color: #CCCCCC;
	 font-size: 24rpx;
 }
 .loading{
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 font-size: 24rpx;
	 .img{
		 width: 30rpx;
		 height: 30rpx;
		 image{
			 width: 100%;
			 height: 100%;
		 }
	 }
	 
 }
 .wxMenuFix {
 		position: fixed;
		width: 100%;
		z-index: 999;
 		top: 0;
 		left: 0;
 	}
 	

</style>
