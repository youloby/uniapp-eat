<template>
	<view class="goods-container">
		<scroll-view scroll-y="true" class="side-bar">
			<view :class="['title-item', active === index ?'selected' :'']"
				v-for="(item, index) in titleList" :key="index"
				@click="selectedClass(index)">
				
				<text class="text"> {{ item.title }} </text>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="content">
			<view class="item" v-for="(item, index) in titleList" :key="index">
				<side-bar-content :title="item.title" :url="item.url"
				:scrollTop="scrollTop"></side-bar-content>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import sideBarContent from '../../components/side-bar-content.vue';
	export default {
		data() {
			return {
				scrollTop: 0,
				active: 0,
				titleList: [
					{title:'店铺热销', url:'http://localhost:3000/hot'},
					{title:'网红咸蛋黄', url:'http://localhost:3000/egg'}
				]
			}
		},
		methods: {
			selectedClass(index){
				this.active = index;
			}
		},
		onPageScroll({scrollTop}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		components: {
			sideBarContent
		}
	}
</script>

<style lang="scss" scoped>
.goods-container {
	display: flex;
	.side-bar {
		position: fixed;
		left: 0;
		top: 0;
		width: 176rpx;
		height: 1240rpx;
		border-right: 2rpx solid #F7F8FA;
		background-color: #F7F8FA;
		
		// 隐藏滚动条
		/* #ifdef H5 */
		::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}
		/* #endif */
		
		.title-item {
			padding: 28rpx 24rpx;
			.text {
				color: #323233;
				font-size: 28rpx;
			}
		}
		.selected {
			position: relative;
			background-color: #fff;
			/* #ifdef H5 */
			&::before {
				content: "";
				position: absolute;
				top: 50%;
				left: 0;
				display: inline-block;
				width: 8rpx;
				height: 32rpx;
				transform: translateY(-50%);
				background-color: #ee0a24;
			}
			/* #endif */
			/* #ifdef MP-WEIXIN */
			border-left: 8rpx solid #ee0a24;
			/* #endif */
		}
	}
	
	.content {
		flex: 1;
		// height: 1240rpx;
		padding: 0 30rpx 0 206rpx;
		background-color: #fff;
	}
}
</style>
