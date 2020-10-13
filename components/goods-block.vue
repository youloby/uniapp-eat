<template>
	<view class="goods-block" :id="gid">
		<image :src="data.img_url" mode="widthFix" class="bar"></image>
		
		<view class="goods-list" v-if="isShow">
			<view class="goods" v-for="item in goodsList" :key="item.id" @click="goGoodsDetails(item.id)">
				<lazyload :img-url="item.image_url" :scroll-top="scrollTop" class="img"></lazyload>
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
	import { getHomeGoods } from '../api/index.js';
	import easyLoadimage from './easy-loadimage/easy-loadimage.vue';
	export default {
		props:['data', 'scrollTop'],
		data() {
			return {
				gid: '',
				isShow: false,
				goodsList: []
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll();
			}
		},
		methods: {
			async getGoodsList(){
				let { status, data } = await getHomeGoods(this.data.url);
				if(!status){
					this.goodsList = data;
				}
			},
			goGoodsDetails(id){
				uni.navigateTo({
					url: `../details/goodsDetails/goodsDetails?goodsId=${id}`
				})
			},
			onScroll(scrollTop){
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+this.gid).boundingClientRect(data => {
				    if(!data) return;
					if(data.top < 1400){
						if(this.goodsList.length == 0)this.getGoodsList();
						this.isShow = true;
					}
				}).exec()
			}
		},
		created() {
			this.gid = 'gid'+Math.floor(Math.random()*10);
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
					height: 224rpx;
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
