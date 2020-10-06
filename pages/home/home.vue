<template>
	<view class="home-container">
		<view>
			<uni-search-bar class="search" placeholder="螺丝粉" cancelButton="auto" bgColor="#fff"
			 @confirm="confirm" @onFocus="searchPage(true)" @cancel="searchPage(false)" ref="reSearch"/>
		</view>
		<view class="searchPage" v-show="isSearch">
			<view class="title">热门搜索</view>
			<view class="content">
				<text v-for="(item, index) in hotSeatch" :key="index" class="item" @click="onSearch(item)">
					{{ item }}
				</text>
			</view>
			<view class="title" v-show="recordSearch[0]">历史搜索</view>
			<view class="content">
				<text v-for="(item, index) in recordSearch" :key="index" class="item" @click="onSearch(item)">
					{{ item }}
				</text>
			</view>
			<view class="del" @click="clearSearch" v-show="recordSearch[0]">
				<image src="../../static/icon/delete.png" mode="widthFix" class="del-icon"></image>
				清空历史搜索
			</view>
		</view>
		<view class="container" v-show="!isSearch">
			
			<scroll-view>
				<swiper :indicator-dots="true" :autoplay="true"
				:circular="true" class="swiper" indicator-active-color="#FF4444">
					<swiper-item v-for="item in swiperList" :key="item.id" class="item">
						<image :src="item.url" class="img" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</scroll-view>
			
			<uni-grid :column="4" :show-border="false" class="grid">
				<uni-grid-item v-for="item in gridList" :key="item.id">
					<image :src="item.url" class="img" mode="widthFix"></image>
				</uni-grid-item>
			</uni-grid>
			
			<uni-grid :column="2" :show-border="false" :square="false" class="peddle">
				<uni-grid-item v-for="item in peddleList" :key="item.id" class="peddle-item">
					<image :src="item.url" class="img" mode="widthFix"></image>
				</uni-grid-item>
			</uni-grid>
			
			<view class="new-goods">
				<image src="../../static/image/new_goods.webp" mode="widthFix" class="img"></image>
			</view>
			
			<scroll-view scroll-x="true" class="new">
				<view class="item" v-for="item in newGoods" :key="item.id">
					<image src="../../static/icon/New-Tag 2.png" mode="widthFix" class="new-tag"></image>
					<view class="goods">
						<easy-loadimage :image-src="item.img_url" :scroll-top="scrollTop"
						:view-height="1000" mode="widthFix" class="img"></easy-loadimage>
						<view class="text">
							<view class="title">
								{{ item.title }}
							</view>
							<view class="buy">
								<view class="price">
									<text class="tag">&yen;</text>
									{{ item.activity_price }}
								</view>
								<image class="icon" src="../../static/icon/cart-circle-o.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
				<view class="all-shell">
					<view class="all">
						查看全部
						<image src="../../static/icon/right.png" mode="widthFix" class="right"></image>
					</view>
				</view>
			</scroll-view>
			<view class="note">
				<view class="note-title">
					<text class="title">种草笔记</text>
					<view class="more" @click="getShopnote()">
						查看更多
						<image src="../../static/icon/right2.png" mode="widthFix" class="right-icon"></image>
					</view>
				</view>
				<scroll-view class="notelist" scroll-x="true">
					<view class="note-item" v-for="item in notes" :key="item.id">
						<easy-loadimage :image-src="item.coverPhotos" :scroll-top="scrollTop"
						:view-height="1000" mode="widthFix" class="img"></easy-loadimage>
						<view class="text">
							<view class="title">{{ item.title }}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<divider></divider>
			<goods-block :bar="goodsBars['送Ta礼物'].url" code="1002" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['各种零食'].url" code="1003" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['果蔬生鲜'].url" code="1004" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['咖啡茶饮'].url" code="1005" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['各种酒水'].url" code="1006" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<view class="status">
				<view class="text">吃货研究所店铺资质</view>
				<image src="../../static/icon/right2.png" mode="widthFix" class="right-icon"></image>
			</view>
			
			<shop-info></shop-info>
			<logo></logo>
		</view>
	</view>
</template>

<script>
	import { getHomeImg, getGoods, getNote, getHotSearch } from '../../api/index.js';
	import goodsBlock from '../../components/goods-block.vue';
	import divider from '../../components/divider.vue';
	import shopInfo from '../../components/shop-info.vue';
	import logo from '../../components/logo.vue';
	export default {
		name: "home",
		data() {
			return {
				isSearch: false,
				hotSeatch: [],
				recordSearch: [],
				swiperList: [],
				gridList: [],
				peddleList: [],
				goodsBars: {},
				newGoods: [],
				notes: [],
				scrollTop:0,
				viewHeight: -1
			}
		},
		methods: {
			async initialize(){
				let { status, data } = await getHomeImg();
				if(!status){
					this.swiperList = data.swiper;
					this.gridList = data.grid;
					this.peddleList = data.peddle;
					this.goodsBars = data.goodsBar;
				}
				let res = await getHotSearch();
				if(!res.status){
					this.hotSeatch = res.data;
				}
				let storageData = uni.getStorage({
					key: "record",
					success: res => {
						this.recordSearch = res.data
						console.log(this.recordSearch);
					}
				});
			},
			async getNewGoods(){
				let { status, data } = await getGoods('1001');
				if(!status){
					this.newGoods = data;
				}
			},
			async getNote(){
				let { status, data } = await getNote(8);
				if(!status){
					this.notes = data;
				}
			},
			isUrl(){
				return Object.keys(this.goodsBars).length !== 0;
			},
			confirm({value}){
				if(this.recordSearch.includes(value.trim())){
					return;
				}
				this.recordSearch.push(value.trim());
				uni.setStorage({key: "record", data: this.recordSearch});
			},
			searchPage(value){
				this.isSearch = value;
				if(value){
					uni.hideTabBar();
				}else {
					uni.showTabBar();
				}
			},
			onSearch(value){
				this.$refs.reSearch.replaceSearch(value);
				this.confirm({value});
			},
			clearSearch(){
				this.recordSearch = [];
				uni.setStorage({
					key: "record",
					data: []
				})
			},
				
			getShopnote(){
				uni.navigateTo({
					url: "../shopnote/shopnote"
				})
			}
		
		},
		onPageScroll({scrollTop}) {
			// 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
			this.scrollTop = scrollTop;
		},
		created(){
			this.initialize();
			this.getNewGoods();
			this.getNote();
		},
		components: {
			goodsBlock,
			divider,
			shopInfo,
			logo
		}
	}
</script>

<style lang="scss" scoped>
.home-container {
	
	/deep/.search {
		.uni-searchbar__box {
			justify-content: initial;
		}
		
		/* #ifdef H5 */
		background-color: #f8f8f8;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		.uni-searchbar {
			background-color: #f8f8f8;
		}
		/* #endif */
	}
	
	.searchPage {
		height: 92vh;
		color: #666;
		font-size: 24rpx;
		background-color: #fff;
		.title {
			padding: 30rpx;
			color: #999;
		}
		.content {
			padding: 0 20rpx;
			.item {
				display: inline-block;
				padding: 0 20rpx;
				height: 64rpx;
				line-height: 64rpx;
				margin: 0 20rpx 20rpx 0;
				text-align: center;
				background-color: #f6f6f6;
			}
		}
		.del {
			width: 276rpx;
			height: 60rpx;
			line-height: 60rpx;
			border: 2rpx solid #e5e5e5;
			border-radius: 32rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			text-align: center;
			.del-icon {
				vertical-align: middle;
				width: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
	
	.swiper {
		height: 352rpx;
		.item .img {
			width: 100%;
		}
	}
	
	.grid {
		background-color: #f6f6f6;
		.uni-grid-item {
			.img {
				width: 100%;
			}
		}
	}
	
	.peddle {
		.peddle-item {
			.img {
				width: 96%;
			}
		}
	}
	
	.new-goods {
		margin-top: 30rpx;
		.img {
			width: 100%;
		}
	}
	.new {
		overflow: hidden;
		white-space: nowrap;
		.item {
			display: inline-block;
			position: relative;
			width: 220rpx;
			
			.new-tag {
				position: absolute;
				top: 70rpx;
				left: 10rpx;
				width: 40rpx;
				z-index: 1;
			}
			.goods {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin: 10rpx;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0,0,0,.06);
				.img {
					width: 100%;
				}
				.text {
					padding: 16rpx 16rpx 4rpx 16rpx;
					.title {
						color: #323233;
						font-size: 26rpx;
						font-weight: 700;
						white-space: normal;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.buy {
						display: flex;
						justify-content: space-between;
						height: 80rpx;
						align-items: center;
						.price {
							color: #f44;
							font-size: 30rpx;
							font-weight: 700;
							.tag {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
						.icon {
							width: 40rpx;
						}
					}
				}
			}
		}
		.all-shell {
			display: inline-block;
			vertical-align: middle;
			margin: 0 20rpx 0 10rpx;
			width: 200rpx;
			.all {
				color: #969799;
				font-size: 24rpx;
				text-align: center;
				line-height: 374rpx;
				background-color: #efefef;
				.right {
					width: 20rpx;
				}
			}
		}
		
	}
	
	.note {
		margin-bottom: 40rpx;
		.note-title {
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			.title {
				color: #323233;
				font-size: 32rpx;
			}
			.more {
				color: #969799;
				font-size: 24rpx;
				.right-icon {
					width: 24rpx;
				}
			}
		}
		.notelist {
			white-space: nowrap;
			padding: 30rpx 30rpx 0 0;
			.note-item {
				display: inline-block;
				width: 300rpx;
				margin-right: 20rpx;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0,0,0,.06);
				.img {
					width: 100%;
				}
				.text {
					padding: 20rpx;
					.title {
						color: #333;
						font-size: 32rpx;
						font-weight: 700;
						white-space: normal;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				&:first-child {
					margin-left: 30rpx;
				}
				&:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}
	
	.status {
		display: flex;
		padding: 0 20rpx;
		height: 88rpx;
		align-items: center;
		background-color: #fff;
		.text {
			width: 100%;
			color: #999;
			text-align: center;
			font-size: 24rpx;
		}
		.right-icon {
			width: 24rpx;
		}
	}
}
</style>
