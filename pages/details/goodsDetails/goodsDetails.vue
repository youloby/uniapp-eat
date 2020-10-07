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
		
		<view class="postage">
			<text>运费</text>
			<view class="val">
				{{ details.postage == 0 ?'免运费':details.postage }}
			</view>
			<text>剩余 {{details.surplus_num}}</text>
		</view>
		<van-cell-group>
			<van-cell title="服务" is-link value="收货后结算 - 快递发货" title-class="title" value-class="value" />
			<van-cell title="选择" is-link value="规格" title-class="title" value-class="value" />
		</van-cell-group>
		
		<view class="shop">
			<image src="../../../static/image/logo.webp" mode="widthFix" class="logo"></image>
			<view class="shop-content">
				<view class="shop-top">
					<view class="title">
						吃货研究所店铺
					</view>
					<view class="shop-btn">
						关注店铺
					</view>
					<view class="shop-enter">
						进店逛逛
					</view>
				</view>
				<view class="shop-tags">
					<view class="tag-official" style="background: url(https://img.yzcdn.cn/public_files/cf75189501624ce4bf364525bfc9ab64.png);background-size:cover;">
					</view>
					<image src="../../../static/image/3年.png" mode="widthFix" class="old-shop"></image>
				</view>
			</view>
		</view>
		<shop-info show="none"></shop-info>
	</view>
</template>

<script>
	import { getGoodsDetails } from '../../../api/index.js';
	import shopInfo from '../../../components/shop-info.vue';
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
		},
		components: {
			shopInfo
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
		
		.postage {
			display: flex;
			justify-content: space-between;
			padding: 26rpx 32rpx;
			margin-top: 16rpx;
			color: #969799;
			font-size: 28rpx;
			.val {
				flex: 1;
				margin-left: 24rpx;
				color: #323233;
			}
		}
		
		/deep/.van-cell-group {
			margin-top: 16rpx;
			.van-cell {
				font-size: 28rpx;
				.title {
					flex: none;
					margin-right: 24rpx;
					color: #969799;
				}
				.value {
					text-align: left;
					color: #323233;
				}
			}
		}
		
		.shop {
			display: flex;
			padding: 32rpx;
			.logo {
				width: 96rpx;
			}
			.shop-content {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 16rpx;
				.shop-top {
					display: flex;
					justify-content: space-between;
					height: 54rpx;
					line-height: 54rpx;
					color: #323233;
					.title {
						flex: 1;
						margin-right: 8rpx;
						font-size: 32rpx;
					}
					.shop-btn {
						padding: 0 16rpx;
						border-radius: 1rem;
						border: 2rpx solid #edebf0;
						font-size: 24rpx;
					}
					.shop-enter {
						padding: 0 16rpx;
						border-radius: 1rem;
						margin-left: 16rpx;
						color: #f44;
						border: 2rpx solid #f44;
						font-size: 24rpx;
					}
				}
				.shop-tags {
					display: flex;
					.tag-official {
						width: 112rpx;
						height: 32rpx;
						margin-right: 12rpx;
					}
					.old-shop {
						width: 152rpx;
					}
				}
			}
		}
	}
</style>
