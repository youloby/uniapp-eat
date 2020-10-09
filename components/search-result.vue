<template>
	<view class="result-container">
		<view class="tab">
			<view :class="['option', action==index?'action':'']"
			v-for="(item, index) in tab" :key="index"
			@click="selected(index)">
				{{ item }}
				<view class="filter" v-if="index == 1">
					<view class="rank ascend"></view>
					<view class="rank descend"></view>
				</view>
			</view>
		</view>
		
		<view class="list">
			<view class="goods" v-for="item in data" :key="item.id">
				<view class="image">
					<image :src="item.image_url" mode="widthFix" class="img"></image>
				</view>
				<view class="info">
					<view class="title">
						{{ item.title }}
					</view>
					<view class="buy">
						<view class="price">
							<view class="icon">&yen;</view>{{ item.price }}
						</view>
						<view class="cart-icon" style="background-image: url(../../../static/icon/cart-circle-o.png);background-size: cover;"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getSearchData } from '../api/index.js';
	export default {
		props: ['isResult', 'keyword'],
		data() {
			return {
				action: 0,
				data: [],
				tab:["综合", "价格", "上新"]
			};
		},
		methods: {
			async getSearchResult(keyword){
				let { status, data } = await getSearchData(keyword);
				if(!status){
					console.log(data);
					this.data = data;
				}
			},
			selected(index){
				this.action = index;
			},
			search(){
			
			}
		}
	}
</script>

<style lang="scss" scoped>
.result-container {
	.tab {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		.option {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			color: #717171;
			text-align: center;
			font-size: 28rpx;
			.filter {
				position: relative;
				display: inline-block;
				.rank {
					position: absolute;
					left: 10rpx;
					width: 6rpx;
					height: 6rpx;
					transform: rotate(45deg);
				}
				.ascend {
					top: -18rpx;
					border-left: 2rpx solid #bbb;
					border-top: 2rpx solid #bbb;
				}
				.descend {
					bottom: 0rpx;
					border-right: 2rpx solid #bbb;
					border-bottom: 2rpx solid #bbb;
				}
			}
		}
		.action {
			color: #f44;
		}
	}
	.list {
		padding: 0 30rpx;
		.goods {
			display: flex;
			justify-content: space-between;
			margin: 20rpx 0;
			background-color: #fff;
			.image {
				width: 290rpx;
				height: 290rpx;
				margin-right: 20rpx;
				.img {
					width: 100%;
				}
			}
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-right: 24rpx;
				.title {
					margin: 24rpx 0 8rpx;
					color: #323233;
					font-size: 28rpx;
				}
				.buy {
					display: flex;
					justify-content: space-between;
					height: 88rpx;
					align-items: center;
					.price {
						display: flex;
						color: #f44;
						font-size: 36rpx;
						align-items: center;
						.icon {
							margin-right: 4rpx;
							font-size: 24rpx;
						}
					}
					.cart-icon {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}
		}
	}
}
</style>
