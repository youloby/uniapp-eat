<template>
	<view>
		<scroll-view>
			<swiper :indicator-dots="true" :autoplay="true"
			:circular="true" class="swiper" indicator-active-color="#FF4444">
				<swiper-item v-for="item in swiperList" :key="item.id" class="item">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</scroll-view>
		
		<view v-show="show !== 'none'">
			<!-- #ifdef H5 -->
			<view class="info">
				<text class="item">店铺主页</text>
				<text class="item" @click="goUser()">个人中心</text>
				<text class="item">关注我们</text>
				<text class="item">店铺信息</text>
			</view>
			<!-- #endif -->
			
			<!-- #ifdef MP-WEIXIN -->
			<divider :title="'店铺信息'"></divider>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import { getSpecialImg } from '../api/index.js';
	import divider from './divider.vue';
	export default {
		props: ['show'],
		data() {
			return {
				swiperList: []
			};
		},
		methods:{
			async getSpecialImg(){
				let { status, data } = await getSpecialImg("member");
				if(!status){
					this.swiperList = data;
				}
			},
			goUser(){
				uni.switchTab({
				    url: '/pages/user/user'
				});
			}
		},
		created(){
			this.getSpecialImg();
		},
		components: {
			divider
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 352rpx;
		.item .img {
			width: 100%;
		}
	}
	
	/* #ifdef H5 */
	.info {
		display: flex;
		justify-content: center;
		margin: 60rpx 0 0 20rpx;
		.item {
			padding: 0 12rpx;
			border-right: 2rpx solid #e5e5e5;
			color: #646566;
			font-size: 24rpx;
			
			&:last-child {
				border-right: 0;
			}
		}
	}
	/* #endif */
	
	
</style>
