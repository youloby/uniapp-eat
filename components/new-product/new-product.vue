<template>
	<view class="new-container" :id="newid" v-show="isShow">
		<view class="new-goods">
			<image src="../../static/image/new_goods.webp" mode="widthFix" class="img"></image>
		</view>
		
		<scroll-view scroll-x="true" class="new">
			<view class="item" v-for="item in newGoods" :key="item.id" @click="goGoodsDetails(item.goodsId)">
				<image src="../../static/icon/New-Tag 2.png" mode="widthFix" class="new-tag"></image>
				<view class="goods">
					<lazyload :img-url="item.img_url" :scroll-top="scrollTop" class="img"></lazyload>
					<view class="text">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="buy">
							<view class="price">
								<text class="tag">&yen;</text>
								{{ item.activity_price }}
							</view>
							<image class="icon" src="../../static/icon/cart-circle-o.png" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="all-shell">
				<view class="all">
					查看全部
					<image src="../../static/icon/right.png" mode="widthFix" class="right"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getGoods } from '../../api/index.js';
	export default {
		props: ["scrollTop"],
		data() {
			return {
				newid: '',
				isShow: false,
				newGoods: []
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll();
			}
		},
		methods: {
			async getNewGoods(){
				let { status, data } = await getGoods('1001');
				if(!status){
					this.newGoods = data;
				}
			},
			goGoodsDetails(goodsId){
				uni.navigateTo({
					url: `../details/goodsDetails/goodsDetails?goodsId=${goodsId}`
				});
			},
			onScroll(scrollTop){
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+this.newid).boundingClientRect(data => {
				    if(!data) return;
					if(data.top < 1400){
						this.isShow = true;
					}
				}).exec()
			}
		},
		created(){
			this.newid = 'newid'+Math.floor(Math.random()*10);
			this.onScroll();
			this.getNewGoods();
		}
	}
</script>

<style lang="scss">
.new-container {
	.new-goods {
		margin-top: 30rpx;
		.img {
			width: 100%;
		}
	}
	.new {
		overflow: hidden;
		white-space: nowrap;
		.item {
			display: inline-block;
			position: relative;
			width: 220rpx;
			
			.new-tag {
				position: absolute;
				top: 70rpx;
				left: 10rpx;
				width: 40rpx;
				z-index: 1;
			}
			.goods {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin: 10rpx;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0,0,0,.06);
				.img {
					width: 100%;
					height: 200rpx;
				}
				.text {
					padding: 16rpx 16rpx 4rpx 16rpx;
					.title {
						color: #323233;
						font-size: 26rpx;
						font-weight: 700;
						white-space: normal;
						
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
		.all-shell {
			display: inline-block;
			vertical-align: middle;
			margin: 0 20rpx 0 10rpx;
			width: 200rpx;
			.all {
				color: #969799;
				font-size: 24rpx;
				text-align: center;
				line-height: 374rpx;
				background-color: #efefef;
				.right {
					width: 20rpx;
				}
			}
		}
		
	}
}
</style>
