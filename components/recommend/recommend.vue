<template>
	<view class="rec-container">
		<view class="rec-title">
			更多精选商品
		</view>
		<view class="rec-list">
			<view class="rec-goods" v-for="item in recData" :key="item.id">
				<navigator :url="'/pages/details/goodsDetails/goodsDetails?goodsId='+item.id" open-type="navigate">
					<lazyload :img-url="item.image_url" :scroll-top="scrollTop" class="img"></lazyload>
					<view class="rec-info">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="price">
							<view class="icon">&yen;</view>{{ item.price }}
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import { getRecommend } from '@/api/index.js';
	export default {
		props:['scrollTop'],
		data() {
			return {
				recData: []
			};
		},
		methods: {
			async getRecommend(){
				let { status, data } = await getRecommend();
				if(status) return;
				this.recData = data;
			}
		},
		created(){
			this.getRecommend();
		}
	}
</script>

<style lang="scss">
.rec-container {
	.rec-title {
		margin-bottom: 24rpx;
		text-align: center;
		color: #323233;
		font-size: 28rpx;
		font-weight: 700;
	}
	.rec-list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 0 40rpx;
		.rec-goods {
			margin: 8rpx 0;
			width: 49%;
			overflow: hidden;
			border-radius: 16rpx;
			background-color: #fff;
			.img {
				width: 100%;
			}
			.rec-info {
				padding: 16rpx 24rpx 8rpx 24rpx;
				.title {
					color: #323233;
					font-size: 26rpx;
					
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
				.price {
					display: flex;
					height: 88rpx;
					line-height: 88rpx;
					color: #f44;
					align-items: center;
					font-size: 36rpx;
					.icon {
						margin-right: 4rpx;
						font-size: 24rpx;
					}
				}
			}
		}
	}
}
</style>
