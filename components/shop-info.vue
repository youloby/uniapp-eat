<template>
	<view>
		<scroll-view v-if="show !== 'swiper'">
			<swiper :indicator-dots="true" :autoplay="true"
			:circular="true" class="swiper" indicator-active-color="#FF4444">
				<swiper-item v-for="item in swiperList" :key="item.id" class="scr">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</scroll-view>
		
		<view v-if="show !== 'info'">
			<!-- #ifdef H5 -->
			<view class="info">
				<navigator class="item" url="/pages/home/home" open-type="navigate">
					店铺主页
				</navigator>
				<navigator class="item" url="/pages/user/user" open-type="navigate">
					个人中心
				</navigator>
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
		.scr .img {
			width: 100%;
		}
	}
	
	/* #ifdef H5 */
	.info {
		display: flex;
		justify-content: center;
		margin: 60rpx 0 0 20rpx;
		.item {
			padding: 0 16rpx;
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
