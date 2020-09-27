<template>
	<view class="goodsphere_container">
		<view class="item">
			
			<view class="img">
				<image src="../../static/car/好物圈.png" mode=""></image>
			</view>
			<text>了解好物圈</text>
			
			<text class="info_one">好物圈是由微信提供的订单和商品管理工具,好物圈数据包括加购商品,订单信息。</text>
			<text class="info_tow">将信息同步至好物圈,你可以收藏朋友推荐的商品与服务,还可以为朋友推荐你认为值得拥有的东西</text>
			<text class="info_three">同时,你也可以直接在微信搜索中搜索到已同步的小程序订单商品,亦能帮助商家在微信搜索中获得更有效地品牌及商品露出。</text>
			<view class="img2">
				<image src="../../static/car/手机搜索.jpg" mode=""></image>
			</view>
			<text style="margin: 20rpx; font-size: 25rpx;">如何使用好物圈</text>
			<text style="margin: 20rpx; font-size: 25rpx; color: #777779;">进入“发现”-“小程序”，轻触搜索框，</text>
			<text style=" font-size: 25rpx; color: #777779;margin-bottom: 300rpx; ">找到“好物圈”</text>
			<text style="margin: 20rpx; font-size: 25rpx; color: #777779;">有赞提供技术支持</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.goodsphere_container {
		.item{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			
			
			
			.img{
				
				width: 200rpx;
				height: 200rpx;
				margin-bottom: 40rpx;
				image{
					width: 100%;
					height:100%;
				}
				
			}
			.img2{
				width: 700rpx;
				height: 200rpx;
				image{
					width: 100%;
					height:100%;
				}
			}
			text{
				font-weight: 600;
				margin-bottom: 20rpx;
			}
			.info_one{
				font-size: 28rpx;
				color: #777779;
				
			}
			.info_tow{
				font-size: 28rpx;
				color: #777779;
				
			}
			.info_three{
				font-size: 28rpx;
				color: #777779;
				
			}
		}
	}	

</style>
