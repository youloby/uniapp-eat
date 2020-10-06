<template>
	<view class="goods-block">
		<image :src="bar" mode="widthFix" class="bar"></image>
		
		<view class="goods-list">
			<view class="goods" v-for="item in goodsList" :key="item.id" @click="goGoodsDetails(item.goodsId)">
				<easy-loadimage :image-src="item.img_url" :scroll-top="scrollTop"
				:view-height="1000" mode="widthFix" class="img"></easy-loadimage>
				<view class="text">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="buy">
						<view class="price">
							<text class="tag">&yen;</text>
							{{ item.activity_price }}
						</view>
						<image class="icon" src="../static/icon/cart-circle-o.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getGoods } from '../api/index.js';
	import easyLoadimage from './easy-loadimage/easy-loadimage.vue';
	export default {
		props:['bar', 'code', 'scrollTop'],
		data() {
			return {
				goodsList: []
			};
		},
		methods: {
			async getGoodsList(){
				let { status, data } = await getGoods(this.code);
				if(!status){
					this.goodsList = data;
				}
			},
			goGoodsDetails(goodsId){
				uni.navigateTo({
					url: `../details/goodsDetails/goodsDetails?goodsId=${goodsId}`
				})
			}
		},
		created() {
			this.getGoodsList();
		},
		components:{
			easyLoadimage
		}
	}
</script>

<style lang="scss">
	.goods-block {
		margin-bottom: 32rpx;
		.bar {
			width: 100%;
		}
		.goods-list {
			display: flex;
			flex-wrap: wrap;
			.goods {
				width: 30%;
				margin: 12rpx;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0,0,0,.06);
				.img {
					width: 100%;
				}
				.text {
					padding: 0 16rpx 4rpx 16rpx;
					.title {
						color: #323233;
						font-size: 24rpx;
						font-weight: 700;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.buy {
						display: flex;
						justify-content: space-between;
						height: 80rpx;
						align-items: center;
						.price {
							color: #f44;
							font-size: 30rpx;
							font-weight: 700;
							.tag {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
						.icon {
							width: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
