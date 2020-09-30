<template>
	<view class="group-container">
		<view class="kefu">
			<image src="../../static/car/群客服.webp" mode=""></image>
		</view>
		
		<view class="info">
			<text class="title">或者你也可以:</text>
			<view class="min_title">
				<text>
				1、关注公众号“吃货研究所店铺”，直接发起对话；
				2、点击店铺左下角“
			</text>
				
			</view>
		</view>
		
		<view class="type_area ">
			<view class="title">
				<text class="vip">购买超级会员</text>
				<text class="fuli">进群之后你可以享受到的真·福利：</text>
				
				
			</view>
			<text>会员可主动加所长微信foodlabshop2017说明来意并告知会员身份</text>
			<text>商务合作请发邮件至food_lab@guokr.com咨询</text>
			<view class="headline1">
				<text>1.每周上新优惠直通车-最直观的新品优惠！！！</text>
				<view class="img">
					<image src="../../static/car/群1.webp" mode=""></image>
				</view>
			</view>
			<view class="headline1">
				<text>2.下单拼手气优惠券，只要手速快随时都有！</text>
				<view class="img">
					<image src="../../static/car/群2.webp" mode=""></image>
				</view>
			</view>
			<view class="headline1">
				<text>3.小程序抽奖抽取小礼物或样品试吃！吸一口欧气！只要参与就有机会中奖！</text>
				<view class="img">
					<image src="../../static/car/群3.webp" mode=""></image>
				</view>
			</view>
			<view class="headline1">
				<text>4.节日红包福利-所长暖暖的祝福</text>
				<view class="img">
					<image src="../../static/car/群4.webp" mode=""></image>
				</view>
			</view>
			<view class="headline1">
				<text>5.资深吃货在线分享美食，跟千百个吃货（偶尔所长也会空降）一起早上聊烤脑花、中午聊爆肚、深夜吃火锅，相互报复嘿嘿嘿嘿嘿……</text>
				<view class="img">
					<image src="../../static/car/群5.webp" mode=""></image>
				</view>
			</view>
			<view class="headline1">
				<text>6.群友在线分享新品买家秀-买东西再也不怕踩雷啦～</text>
				<view class="img">
					<image src="../../static/car/群6.webp" mode=""></image>
				</view>
			</view>
			<view class="headline1">
				<text>7.活跃用户所长亲自颁发奖励</text>
				<text>所长每月亲自评选一名优秀吃货并颁发小礼物！</text>
				<view class="img">
					<image src="../../static/car/二维码.webp" mode=""></image>
				</view>
			</view>
		</view>
		<shop-info></shop-info>
		<logo></logo>
	</view>
</template>

<script>
	import shopInfo from '../../components/shop-info.vue';
	import logo from '../../components/logo.vue';
	export default {
		data() {
			return {
				
			};
		},
		components: {
			shopInfo,
			logo
		}
	}
</script>

<style lang="scss">
.group-container {
	margin: auto;
	background-color: #f9f9f9;
	.kefu{
		margin: 10rpx;
		padding: 10rpx;
		background-color: #fff;
		width: 800rpx;
		height: 169rpx;
		image{
			width: 100%;
			height: 100%;
		}
		
	}
	.info{
		margin: auto;
		background-color: #fff;
		padding: 10rpx;
		font-size: 24rpx;
		width: 700rpx;
		height: 169rpx;
	}
	.type_area{
		
		font-size: 24rpx;
		width: 800rpx;
		
		.title{
			
			.vip{
				color: #FF0000;
				font-size: 28rpx;
			}
			
		}
		
		.headline1{
			
			margin:10px auto;
			font-weight: 700;
			font-size: 30rpx;
				
			.img{
				width: 700rpx;
				height: 400px;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
