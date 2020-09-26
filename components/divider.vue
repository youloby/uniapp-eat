<template>
	<view>
		<view class="insert" v-if="title">
			<view class="line"></view>
			<view class="title">
				{{ title }}
			</view> 
			<view class="line"></view>
		</view>
		<view class="divider" v-else></view>
	</view>
</template>

<script>
	export default {
		props:['title'],
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.divider {
		width: 100%;
		height: 2rpx;
		margin: 20rpx 0;
		background-color: #e5e5e5;
	}
	
	.insert {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin: 20rpx 20rpx;
		.line {
			flex: 1;
			height: 2rpx;
			background-color: #e5e5e5;
		}
		.title {
			margin: 20rpx 20rpx;
			color: #bfbfc3;
			font-size: 24rpx;
		}
	}
</style>
