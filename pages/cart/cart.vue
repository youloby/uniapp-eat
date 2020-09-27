<template>
	<view class="cart-container">
	
		<!-- 空状态购物车 -->
		<view class="empty_goodscar">
			<view class="item">
				<view>
					<image class="img" src="../../static/car/空购物车.png" mode=""></image>
				</view>
	
				<view class="title">购物车还是空的</view>
				<view class="title2">赶紧买点宝贝慰劳下自己吧</view>
				<van-button plain round size="normal" color="#ff0000" type="primary" @click="getIndex()">去逛逛</van-button>
				<!-- #ifdef MP-WEIXIN -->
				<view class="goodssphere" @click="getGoodsSphere()">
					<image class="img" src="../../static/car/好物圈.png" mode=""></image>
					<view >
						已同步至好物圈
					</view>
				</view>
				<!-- #endif -->
				
			</view>
		</view>
		<divider title="更多精选商品"></divider>
		<!-- 更多商品 -->
		<view class="goodslist">
			<view v-for="item in goodsData" :key="item.id" class="book_item">
				<view class="img">
					<image :src="item.image_url" mode=""></image>
				</view>
				<view class="book_title">
					<view class="title_name">{{ item.title}}</view>
					<span class="price">￥{{item.price}}</span>
				</view>
			</view>
		</view>
	
		
		<logo />
	</view>
</template>

<script>
	import logo from "../../components/logo.vue"
	import divider from "../../components/divider.vue"
	import { getAllGoods } from "../../api/index.js"
	export default {
		data() {
			return {
				goodsData: {}
			};
		},
		methods: {
			// 返回首页
			getIndex() {
				uni.switchTab({
					url: "/pages/home/home",
		
				})
			},
			getGoodsSphere() {
				uni.navigateTo({
					url: "/pages/goodsphere/goodsphere",
				})
			},
			async getGoodsList(){
				var {status, data}  = await getAllGoods("http://localhost:3000/recommend");
				this.goodsData = data
				console.log(data)
				
			}
		},
		components:{
			logo,
			divider
		},
		onLoad() {
			this.getGoodsList()
		}
	}
</script>

<style lang="scss" scoped>
.cart-container {
	background: #f9f9f9;
	
	.empty_goodscar {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.item {
			margin-top: 100rpx;
			width: 400rpx;
			text-align: center;
	
			.img {
				width: 300rpx;
				height: 200rpx;
			}
	
			.title {
				margin-top: 38rpx;
				font-size: 28rpx;
			}
	
			.title2 {
				margin: 38rpx 0;
				color: #ccc;
			}
	
			.goodssphere {
				display: flex;
				align-items: center;
				justify-content: center;
				margin-top: 50rpx;
				font-size: 28rpx;
				color: #C8C9CC;
				margin-bottom: 40rpx;
	
				.img {
					width: 32rpx;
					height: 30rpx;
				}
			}
		}
	}
	.goodslist {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
		
		margin-top: 20rpx;
		.book_item {
			// display: flex;
			width: 47%;
			margin-bottom: 20rpx;
			background: #fff;
			padding: 10rpx;
			overflow: hidden;
			border-radius: 60rpx;
			.img {
				width: 354rpx;
				height: 360rpx;
				// overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
	
				
			}
			.book_title {
				padding: 20rpx;
				
				.title_name{
					font-weight: 700;
					font-size: 12px;
					margin-bottom: 10rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2; /* 指定显示文本的行数 */
					overflow: hidden; /* 超出隐藏 */
					text-overflow: ellipsis; /* 超出部分显示省略号 */
				}
				.price{
					color: #FF4444;
					font-size: 12px;
				}
				
			}
		}
	}
	
}
</style>
