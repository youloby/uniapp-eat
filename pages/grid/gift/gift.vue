<template>
	<view class="gift_container">
		<view class="img">
			<image src="../../../static/grid/gift.webp" mode=""></image>
		</view>
		<view class="giftlist">
			<view v-for="item in giftData" :key="item.id" @click="goGoodsDetails(item.id)" class="gift_item">
				<view class="img">
					<image :src="item.image_url" mode=""></image>
				</view>
				<view class="gift_title">
					<view class="title_name">{{ item.title}}</view>
					<view class="title_info">
						{{ item.sell_point}}
					</view>
					<view class="info_price">
						<span class="price">￥{{item.price}}</span>
						
						<view class="img">
							<image src="../../../static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<shop-info />
		<logo />
		
		<tabbar :current="-1"></tabbar>
	</view>
</template>

<script>
	import { getGiftList } from "../../../api/index.js"
	import shopInfo from '../../../components/shop-info.vue';
	import logo from '../../../components/logo.vue';
	export default {
		data() {
			return {
				giftData:{},
				page:1,
			}
		},
		methods:{
			async getGiftListData(){
				var {status, data} = await getGiftList(this.page);
				
				this.giftData = data
			},
			goGoodsDetails(goodsId){
				uni.navigateTo({
					url: `../../details/goodsDetails/goodsDetails?goodsId=${goodsId}`
				});
			},
		},
		async onReachBottom() {
			this.page++;
			var {status, data} = await getGiftList(this.page);
			this.giftData = this.giftData.concat(data)
		},
		components: {
			shopInfo,
			logo
		},
		onLoad() {
			this.getGiftListData()
		},
		
	}
</script>

<style lang="scss" scoped>
	.gift_container{
		.img{
			width: 100%;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		
		.giftlist {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;
			
			margin-top: 20rpx;
			.gift_item {
				// display: flex;
				width: 47%;
				margin-bottom: 20rpx;
				background: #fff;
				padding: 10rpx;
				.img {
					width: 354rpx;
					height: 360rpx;
					// overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}
		
					
				}
				.gift_title {
					padding: 20rpx;
					
					.title_name{
						font-weight: 700;
						font-size: 14px;
						margin-bottom: 10rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2; /* 指定显示文本的行数 */
						overflow: hidden; /* 超出隐藏 */
						text-overflow: ellipsis; /* 超出部分显示省略号 */
					}
					.title_info{
						font-size: 12px;
						color: #CCCCCC;
					}
					.info_price{
						display: flex;
						align-items: center;
						// justify-content: center;
						justify-content: space-between;
						margin-top: 10px;
						.price{
							color: #FF4444;
							font-size: 14px;
							font-weight: 600;
						}
						.img{
							width: 48rpx;
							height: 48rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}
					}
					
					
				}
			}
		}
	}

</style>
