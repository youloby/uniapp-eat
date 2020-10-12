<template>
	<view class="side-bar-content" :id="sbcid">
		<view class="class-title">
			{{ data.title }}
		</view>
		<view class="loading" v-if="!isShow">
			加载中...
		</view>
		<view class="empty" v-else-if="goodsList.length == 0">
			暂时还没有商品
		</view>
		<view class="goods-list" v-else>
			<view class="goods" v-for="item in goodsList" :key="item.id" @click="goGoodsDetails(item.id)" >
				<view class="goods-img">
					<lazyload :img-url="item.imageUrl" :scroll-top="scrollTop" class="img"></lazyload>
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
						<view class="icon" style="background-image: url(../static/icon/cart-circle-o.png);background-size: cover;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getClassifyGoods } from '../api/index.js';
	import easyLoadimage from './easy-loadimage/easy-loadimage.vue';
	export default {
		props:['data', 'scrollTop', 'index'],
		data() {
			return {
				sbcid: '',
				isInitialize: false,
				isShow: false,
				goodsList: []
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll(val);
			}
		},
		methods:{
			async getGoodsData(){
				let { status, data } = await getClassifyGoods(this.data.alias, 100);
				if(!status){
					this.goodsList = data;
				}
				if(!this.isShow)this.isShow = true;
			},
			goGoodsDetails(goodsId){
				uni.navigateTo({
					url: `../details/goodsDetails/goodsDetails?alias=${this.data.alias}&goodsId=${goodsId}`
				})
			},
			onScroll(scrollTop){
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+this.sbcid).boundingClientRect(data => {
					if(!data) return;
					if(data.top >1200 || data.top < -200) return;
					this.getGoodsData();
					if(data.top > 200) this.$emit("leap", this.index-1);
					if(data.top <300) this.$emit("leap", this.index);
				}).exec();
			}
		},
		created(){
			this.sbcid = 'sbc'+ this.index;
			this.$nextTick(function(){
				this.onScroll();
			});
		},
		components: {
			easyLoadimage
		}
	}
</script>

<style lang="scss">
	.side-bar-content {
		overflow: hidden;
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
						height: 176rpx;
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
							height: 48rpx;
						}
					}
				}
			}
		}
		.loading {
			height: 100rpx;
			line-height: 100rpx;
			margin-bottom: 340rpx;
			text-align: center;
			color: #969799;
			font-size: 28rpx;
		}
		
		.empty {
			height: 100rpx;
			line-height: 100rpx;
			margin-bottom: 140rpx;
			text-align: center;
			color: #969799;
			font-size: 28rpx;
		}
	}
</style>
