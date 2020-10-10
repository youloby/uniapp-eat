<template>
	<view class="goods-container">
		<view class="goods-content">
			
			<scroll-view scroll-y="true" :class="['flex-bar', side]">
				<view :class="['title-item', active === index ?'selected' :'']"
					v-for="(item, index) in classList" :key="index"
					@click="selectedClass(index)">
					
					<text class="text"> {{ item.title }} </text>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="content">
				<view class="item" v-for="(item, index) in classList" :key="index">
					<side-bar-content :data="item" :id="'sbc'+index" :index="index"
					:scrollTop="scrollTop" @leap="leap"></side-bar-content>
				</view>
			</scroll-view>
		</view>
		<shop-info id="bottom"></shop-info>
		<logo></logo>
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import sideBarContent from '../../components/side-bar-content.vue';
	import shopInfo from '../../components/shop-info.vue';
	import logo from '../../components/logo.vue';
	export default {
		data() {
			return {
				scrollTop: 0,
				active: 0,
				side: "",
				lastTime: 0,
				classTops: [],
				classList: [
					{title:'店铺热销', classify:'hot'},
					{title:'网红咸蛋黄', classify:'egg'},
					{title:'榴莲控', classify:'durian'},
					{title:'抹茶控', classify:'matcha'},
					{title:'咖啡', classify:'coffee'},
					{title:'新鲜水果', classify:'fruits'},
					{title:'卤味零食', classify:'meat'},
					{title:'巧克力', classify:'chocolate'},
					{title:'洋酒', classify:'foreignWines'},
					{title:'方便速食', classify:'conveniency'},
					{title:'快手菜', classify:'easyFood'},
					{title:'糕点', classify:'cake'},
					{title:'饼干', classify:'biscuits'},
					{title:'新鲜蛋糕', classify:'torta'}
				]
			}
		},
		watch: {
			scrollTop(val){
				this.sideBarAbs();
			}
		},
		methods: {
			selectedClass(index){
				this.active = index;
				// #ifdef H5
				const query = uni.createSelectorQuery().in(this);
				query.select(`#sbc${index}`).boundingClientRect(data => {
					if(!data) return;
					uni.pageScrollTo({
						scrollTop: this.scrollTop+data.top,
						duration: 0
					});
				}).exec();
				// #endif
				
				// #ifdef MP-WEIXIN
				uni.pageScrollTo({
					selector: `#sbc${index}`,
					duration: 0
				});
				// #endif
				
			},
			sideBarAbs(){
				const query = uni.createSelectorQuery().in(this);
				query.select('#bottom').boundingClientRect(data => {
					if(data.top < 700) this.side = "abs-bar";
					if(data.top > 600) this.side = "";
				}).exec();
			},
			leap(index){
				this.active = index;
			}
		},
		onPageScroll({scrollTop}) {
			this.scrollTop = scrollTop;
		},
		components: {
			sideBarContent,
			shopInfo,
			logo
		}
	}
</script>

<style lang="scss" scoped>
.goods-container {
	margin-bottom: 120rpx;
	.goods-content {
		position: relative;
		.flex-bar {
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
		.abs-bar {
			position: absolute;
			top: auto;
			bottom: 0;
		}
		
		.content {
			width: 69%;
			padding: 0 30rpx 0 206rpx;
			background-color: #fff;
		}
	}
}
</style>
