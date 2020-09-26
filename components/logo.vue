<template>
	<view class="logo-container">
		<view class="logo">
			<image :src="logo.img_url" mode="widthFix" class="logo-img"></image>
			<view class="text">
				<image src="../static/icon/praise.png" mode="widthFix" class="icon"></image>
				有赞提供技术支持
			</view>
		</view>
	</view>
</template>

<script>
	import { getSpecialImg } from '../api/index.js';
	export default {
		data() {
			return {
				logo: {}
			};
		},
		methods: {
			async getLogoImg(){
				let { status, data } = await getSpecialImg('logo');
				if(!status){
					this.logo = data[0];
				}
			}
		},
		created(){
			this.getLogoImg();
		}
	}
</script>

<style lang="scss">
	.logo-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 180rpx;
		text-align: center;
		.logo {
			.logo-img {
				width: 220rpx;
			}
			
			.text {
				.icon {
					width: 24rpx;
					margin-right: 4rpx;
				}
				color: #bfbfc3;
				font-size: 24rpx;
			}
		}
	}
	
</style>
