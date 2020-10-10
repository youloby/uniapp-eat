<template>
	<view class="user_container">
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
			<van-cell icon="shopping-cart-o" title="购物车" is-link link-type="navigateTo" />
			<!-- #ifdef H5 -->
			<van-cell icon="user-o" title="吃货分销员中心" is-link link-type="navigateTo" />
			<!-- #endif -->
			<van-cell icon="chat-o" title="客服聊天" is-link link-type="navigateTo" />
		</van-cell-group>
		
		<!-- #ifdef H5 -->
		<van-cell icon="like-o" title="心愿单" is-link />
		<!-- #endif -->
		
		<!-- 用户 -->
		<van-cell-group class="address">
			<van-cell icon="location-o" title="收货地址" is-link />
			<van-cell icon="user-o" title="个人信息" is-link />
			<van-cell icon="setting-o" title="账号设置" is-link />
		</van-cell-group>
		
		
		<!-- #ifdef H5 -->
		<view class="img">
			<image src="../../static/user/卖家.webp" mode=""></image>
			
		</view>
		<van-cell icon="shop-o" title="吃货研究所店铺" is-link link-type="navigateTo" url="/pages/home/home" />
		<divider title="更多精选商品"></divider>
		<view class="goodslist">
			<view v-for="item in goodsData" :key="item.id" class="book_item">
				<view class="img">
					<image :src="item.image_url" mode=""></image>
				</view>
				<view class="book_title">
					<view class="title_name">{{ item.title}}</view>
					<span class="price">￥{{item.price}}</span>
				</view>
			</view>
		</view>
		<!-- #endif -->
		
		<logo class="logo" />
		<tabbar :current="4"></tabbar>
	</view>
</template>

<script>
	import logo from "../../components/logo.vue"
	import divider from "../../components/divider.vue"
	import { getAllGoods } from "../../api/index.js"
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
				],
				goodsData: {}
			};
		},
		
		methods:{
			async getGoodsList(){
				var {status, data}  = await getAllGoods("recommend");
				this.goodsData = data
				console.log(data)
				
			}
		},
		
		created(){
			this.getGoodsList();
		},
		components:{
			logo,
			divider
		}
	}
</script>

<style lang="scss" scoped>
	.user_container {
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
			/* #ifdef H5 */
			background-image:  url(../../static/user/背景图.png);
			/* #endif */
			/* #ifdef MP-WEIXIN */
			background-image: url(../../static/user/背景图.png);
			/* #endif */
			
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
					width: 100rpx;
					height: 100rpx;
					image {
						width: 100rpx;
						height: 100rpx;
					}

				}
				.name {
				
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
			// align-content: center;
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
	
		/* #ifdef H5 */
			.img{
				width: 800rpx;
				height: 300rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.goodslist {
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				width: 100%;
				
				margin-top: 20rpx;
				.book_item {
					// display: flex;
					width: 47%;
					margin-bottom: 20rpx;
					background: #fff;
					padding: 10rpx;
					overflow: hidden;
					border-radius: 60rpx;
					.img {
						width: 354rpx;
						height: 360rpx;
						// overflow: hidden;
						image {
							width: 100%;
							height: 100%;
						}
			
						
					}
					.book_title {
						padding: 20rpx;
						
						.title_name{
							font-weight: 700;
							font-size: 12px;
							margin-bottom: 10rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2; /* 指定显示文本的行数 */
							overflow: hidden; /* 超出隐藏 */
							text-overflow: ellipsis; /* 超出部分显示省略号 */
						}
						.price{
							color: #FF4444;
							font-size: 12px;
						}
						
					}
				}
			}
		/* #endif */
	}
</style>
