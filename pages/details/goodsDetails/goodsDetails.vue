<template>
	<view class="goods-container">
		<scroll-view class="scroll-img">
			<swiper :autoplay="true"
			:circular="true" class="swiper"
			@change="countDot">
				<swiper-item v-for="item in imgs" :key="item.id" class="item">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			<view class="count">
				{{current}}/{{imgs.length}}
			</view>
		</scroll-view>
		
		<view class="info">
			<view class="price">
				<text class="icon">&yen;</text>{{ details.price }}
			</view>
			<view class="svip">
				<text class="icon">SVIP</text>
				<view class="content">
					吃货超级会员原价再减￥{{ (details.price/10).toFixed(2) }}
				</view>
				<view>
					立即省钱>
				</view>
			</view>
			<view class="title">
				<view class="content">
					{{ details.title }}
				</view>
				<view class="share">
					<view class="icon" style="background-image: url(../../../static/icon/share.png);background-size:cover;">
						
					</view>
					<view class="text">
						分享
					</view>
				</view>
			</view>
			<view class="sell_point">
				{{ details.sell_point }}
			</view>
		</view>
	</view>
</template>

<script>
	import { getGoodsDetails } from '../../../api/index.js';
	export default {
		data() {
			return {
				current: 1,
				details: {},
				imgs: []
			};
		},
		methods: {
			async getGoodsDetails(goodsId){
				let { status, data } = await getGoodsDetails(goodsId);
				if(!status){
					this.details = data.details[0];
					this.details.price = Number(this.details.price).toFixed(2);
					this.imgs = data.imgs;
				}
			},
			countDot(e){
				this.current = e.detail.current+1;
			}
		},
		onLoad: function (option) {
			this.getGoodsDetails(option.goodsId);
		}
	}
</script>

<style lang="scss" scoped>
	.goods-container {
		.scroll-img {
			position: relative;
			.swiper {
				height: 750rpx;
				.item {
					.img {
						width: 100%;
					}
				}
			}
			.count {
				position: absolute;
				right: 30rpx;
				bottom: 30rpx;
				padding: 4rpx 12rpx;
				font-size: 24rpx;
				border-radius: 999rpx;
				color: #fff;
				background-color: rgba(0,0,0,.36);
			}
		}
		.info {
			padding: 16rpx 32rpx 20rpx 32rpx;
			background-color: #fff;
			.price {
				margin: 4rpx 0 16rpx 0;
				color: #f44;
				font-size: 44rpx;
				font-weight: 700;
				.icon {
					font-size: 32rpx;
					margin-right: 4rpx;
					
				}
			}
			.svip {
				display: flex;
				justify-content: space-between;
				padding: 18rpx 20rpx;
				border-radius: 8rpx;
				font-size: 26rpx;
				color: #6c3805;
				background-image: linear-gradient(134deg,#f9e1aa,#ffe8b4 52%,#e1c78e);
				.icon {
					display: inline-block;
					width: 60rpx;
					margin-right: 16rpx;
					border-radius: 4rpx;
					color: #f9e1aa;
					font-size: 24rpx;
					font-style: oblique;
					font-weight: 500;
					background-color: black;
				}
				.content {
					flex: 1;
					padding-right: 42rpx;
				}
			}
			.title {
				display: flex;
				justify-content: space-between;
				margin-top: 16rpx;
				.content {
					width: 576rpx;
					margin-right: 44rpx;
					color: #323233;
					font-size: 32rpx;
				}
				.share {
					display: flex;
					flex-direction: column;
					width: 48rpx;
					.icon {
						width: 100%;
						height: 56rpx;
					}
					.text {
						color: #969799;
						font-size: 24rpx;
					}
				}
			}
			.sell_point {
				margin-top: 16rpx;
				color: #969799;
				font-size: 26rpx;
			}
		}
	}
</style>
