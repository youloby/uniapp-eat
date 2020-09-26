<template>
	<view class="user-container">
		<van-button class="signin" icon="/static/user/笔.png" size="mini" round color="rgba(20, 20, 20, 0.5)">签到</van-button>
		
		<!-- 二维码 -->
		<van-button class="van_button" icon="/static/user/code.png" size="mini" round color="rgba(20, 20, 20, 0.5)">会员码</van-button>

		<view class="info">
			<view class="item">
				<view class="img">
					<image :src="infoData.img_url" mode=""></image>
				</view>
				<view class="name">
					<view class="info_name"> {{ infoData.name}} </view>
				</view>
			</view>

		</view>
		
		
		<!-- 优惠 -->
		<view class="integral">
			<view class="item" v-for="item in integralData" :key="item.name">
				<view class="data_number">{{ item.number}}</view>
				<view class="title_name">{{ item.name }}</view>
			</view>
			<view class="fees">
				
				<van-icon name="gold-coin-o" size="40rpx" />
				<text>零钱</text>
			</view>
		</view>
		
		<!-- 图 -->
		<view class="vipimg">
			<image src="../../static/user/会员日.jpg" mode=""></image>
		</view>
		<!-- 订单状态 -->
		<view class="my_order">
			<van-cell title="我的订单" is-link value="查看全部订单" link-type="navigateTo" />

			<view class="grid">
				<view v-for="item in orderStateData" :key="item.name" class="grid_item">
					<van-icon :name="item.icon" size="40rpx" />
					<text>{{ item.name }}</text>
				</view>
			</view>

		</view>

		<van-cell-group class="van_cell">
			<van-cell icon="shopping-cart-o" title="购物车" is-link link-type="switchTab" />
			<van-cell icon="chat-o" title="客服聊天" is-link link-type="navigateTo" />

		</van-cell-group>
		
		<!-- 用户 -->
		<van-cell-group class="address">
			<van-cell icon="location-o" title="收货地址" is-link />
			<van-cell icon="user-o" title="个人信息" is-link />
			<van-cell icon="setting-o" title="账号设置" is-link />
		</van-cell-group>
		<logo class="logo" />
	</view>
</template>

<script>
	import logo from "../../components/logo.vue"
	export default {
		data() {
			return {
				infoData: {
					name: "点击显示微信头像",
					img_url: "../../static/user/头像.png"
				},
				userInfo: {},
				integralData: [{
						name: "余额",
						number: "0.00"
					},
					{
						name: "咖啡豆",
						number: 0
					},
					{
						name:"卡",
						number:0
					},
					{
						name: "优惠券/码",
						number: 0
					},
					
				],
				orderStateData: [{
						icon: "/static/user/我的-订单状态-待付款.png",
						name: "待付款"
					},
					{
						icon: "/static/user/订单状态.png",
						name: "待发货"
					},
					{
						icon: "/static/user/我的-订单状态-待发货.png",
						name: "待收货"
					},
					{
						icon: "/static/user/我的-订单状态-待评价.png",
						name: "待评价"
					},
					{
						icon: "/static/user/我的-订单状态-退换货.png",
						name: "退款/售后"
					},
				]
			};
		},
		components:{
			logo
		}
	}
</script>

<style lang="scss" scoped>
	.user-container {
		margin: auto;
		height: 100vh;
		// background: #000000;
		.signin{
			position: absolute;
			top: 40rpx;
			width: 120px;
			right: 0rpx;
		}
		.van_button {
			position: absolute;
			top: 40rpx;
			// width: 100px;
			right: 0rpx;
		}

		.info {
			display: flex;
			justify-content: center;
			align-items: center;
			background-image: linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255)), url(../../static/user/背景图.png);
			background-size: 100% 100%;
			height: 375rpx;

			.item {
				display: flex;
				align-items: center;
				
				flex-direction: column;
				.img {
					display: flex;
					align-items: center;
					margin-left: 50rpx;

					image {
						width: 100rpx;
						height: 100rpx;
					}

				}
				.name {
					margin-left: 20rpx;
				
					display: flex;
					flex-direction: column;
				
					.info_name {
						font-weight: 700;
					}
				
					.info_zhi {
						font-size: 24rpx;
						border: 1px solid #000000;
						text-align: center;
						color: #fff;
						background: #000000;
						border-radius: 20rpx;
					}
				}
			}


		}
	
		


		.integral {
			display: flex;
			margin: auto;
			align-content: center;
			background: #fff;
			width: 98%;
			height: 120rpx;
			border-radius: 20rpx;
			margin-top: 20rpx;

			.item {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				flex-direction: column;
				flex: 1;

				.data_number {
					font-weight: 700;
				}

				.title_name {
					margin-top: 10rpx;
					font-size: 28rpx;
					color: #909193;
				}
			}
			.fees{
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				margin-left: 20rpx;
				margin-right: 20rpx;
					
				
				text{
					margin-top: 5px;
					color: #909193;
					font-size: 28rpx;
				}
			}
		}

		.vipimg{
			position: relative;
			width: 690rpx;
			height: 200rpx;
			border-radius: 30rpx;
			margin: auto;
			overflow: hidden;
			margin-top: 10rpx;
			margin-bottom: 10rpx;
			image{
				
				width: 100%;
				height: 100%;
			}
		}
		.my_order {
			margin: auto;
			width: 98%;
			height: 260rpx;
			margin-top: 20rpx;
			border-radius: 20rpx;
			background: #fff;

			.grid {

				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 40rpx;

				.grid_item {
					display: flex;
					align-items: center;
					flex-direction: column;
					font-size: 28rpx;

					text {
						margin-top: 10rpx;
					}
				}
			}
		}

		.van_cell {
			padding: 20rpx;
		}

		.address {
			padding: 20rpx;
		}
		
		.logo{
			margin-bottom: 100rpx;
		}
	}
</style>
