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
			<view class="item" v-for="(item, index) in titleList" :key="index" :id="'sel'+index">
				<side-bar-content :data="item" :active="active"
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
				isCut: true,
				scrollTop: 0,
				active: 0,
				classTops: [],
				titleList: [
					{title:'店铺热销', url:'http://localhost:3000/hot', index:0},
					{title:'网红咸蛋黄', url:'http://localhost:3000/egg', index:1},
					{title:'榴莲控', url:'http://localhost:3000/durian', index:2},
					{title:'抹茶控', url:'http://localhost:3000/matcha', index:3},
					{title:'咖啡', url:'http://localhost:3000/coffee', index:4},
					{title:'新鲜水果', url:'http://localhost:3000/fruits', index:5},
					{title:'卤味零食', url:'http://localhost:3000/meat', index:6},
					{title:'巧克力', url:'http://localhost:3000/chocolate', index:7},
					{title:'洋酒', url:'http://localhost:3000/foreignWines', index:8},
					{title:'方便速食', url:'http://localhost:3000/conveniency', index:9},
					{title:'快手菜', url:'http://localhost:3000/easyFood', index:10},
					{title:'糕点', url:'http://localhost:3000/cake', index:11},
					{title:'饼干', url:'http://localhost:3000/biscuits', index:12},
					{title:'新鲜蛋糕', url:'http://localhost:3000/torta', index:13}
				]
			}
		},
		methods: {
			selectedClass(index){
				this.isCut = false;
				this.active = index;
				
				const query = uni.createSelectorQuery().in(this);
				query.select(`#sel${index}`).boundingClientRect(data => {
					uni.pageScrollTo({
						scrollTop: this.scrollTop+data.top,
						duration: 0
					});
					
				}).exec(() => {
					this.isCut = true;
				});
				
			}
		},
		onPageScroll({scrollTop}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
			
			if(!this.isCut){
				return;
			}
			const query = uni.createSelectorQuery().in(this);
			query.select(`#sel${this.active}`).boundingClientRect(data => {
				console.log(data.top);
				if(data.top > 0 && this.active >= 0){
					this.active --;
					return;
				}
			}).exec();
			
			const query2 = uni.createSelectorQuery().in(this);
			query2.select(`#sel${this.active+1}`).boundingClientRect(data => {
				console.log('down',data.top);
				if(data.top < 600){
					this.active ++;
				}
			}).exec();
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
			padding: 28rpx 26rpx;
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
