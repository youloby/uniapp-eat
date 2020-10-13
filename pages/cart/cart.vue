<template>
	<view class="cart-container">
	
		<!-- 空状态购物车 -->
		<view class="empty_goodscar" >
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
		<recommend :isShow="false" />
		<logo />
	</view>
</template>

<script>
	import logo from "../../components/logo.vue"
	import divider from "../../components/divider.vue"
	import recommend from "../../components/recommend/recommend.vue"
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 返回首页
			getIndex() {
				uni.navigateTo({
					url: "/pages/home/home",
				})
			},
			getGoodsSphere() {
				uni.navigateTo({
					url: "/pages/goodsphere/goodsphere",
				})
			},
			goGoodsDetails(goodsId){
				uni.navigateTo({
					url: `../details/goodsDetails/goodsDetails?goodsId=${goodsId}`
				});
			},
			
		},
		components:{
			logo,
			divider,
			recommend
		},
		
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
				font-size: 24rpx;
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
	
}
</style>
