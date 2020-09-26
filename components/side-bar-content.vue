<template>
	<view class="side-bar-content">
		<view class="class-title">
			{{ title }}
		</view>
		<view class="goods-list">
			<view class="goods" v-for="item in goodsList" :key="item.id">
				<view class="goods-img">
					<easy-loadimage :image-src="item.imageUrl" :scroll-top="scrollTop"
					:view-height="1000" mode="widthFix" class="img"></easy-loadimage>
				</view>
				<view class="info">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="activity">
						{{ item.sellPoint }}
					</view>
					<view class="buy">
						<view class="price">
							<text class="tag">&yen;</text>
							{{ Number(item.price) }}
						</view>
						<image class="icon" src="../static/icon/cart-circle-o.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getAllGoods } from '../api/index.js';
	import easyLoadimage from './easy-loadimage/easy-loadimage.vue';
	export default {
		props:['title', 'url', 'scrollTop'],
		data() {
			return {
				goodsList: []
			};
		},
		methods:{
			async getGoodsData(){
				let { status, data } = await getAllGoods(this.url);
				if(!status){
					this.goodsList = data;
				}
			}
		},
		created(){
			this.getGoodsData();
		},
		components: {
			easyLoadimage
		}
	}
</script>

<style lang="scss">
	.side-bar-content {
		.class-title {
			height: 60rpx;
			line-height: 60rpx;
			color: #666;
			font-size: 24rpx;
		}
		.goods-list {
			.goods {
				display: flex;
				margin: 20rpx 0;
				.goods-img {
					width: 176rpx;
					.img {
						width: 100%;
					}
				}
				.info {
					flex: 1;
					display: flex;
					flex-direction: column;
					margin: 0 20rpx;
					.title {
						margin-bottom: 8rpx;
						color: #323233;
						font-size: 28rpx;
						font-weight: 700;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.activity {
						color: #969799;
						font-size: 24rpx;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
					.buy {
						display: flex;
						justify-content: space-between;
						height: 80rpx;
						align-items: center;
						.price {
							color: #f44;
							font-size: 36rpx;
							font-weight: 600;
							.tag {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
						.icon {
							width: 48rpx;
						}
					}
				}
			}
		}
	}
</style>
