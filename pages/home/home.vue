<template>
	<view class="home-container">
		<search @updateIsSearch="updateIsSearch"></search>
		<view class="container" v-show="!isSearch">
			
			<scroll-view>
				<swiper :indicator-dots="true" :autoplay="true"
				:circular="true" class="swiper" indicator-active-color="#FF4444">
					<swiper-item v-for="item in swiperList" :key="item.id" class="item">
						<image :src="item.img_url" class="img" mode="widthFix"></image>
					</swiper-item>
				</swiper>
			</scroll-view>
			
			<uni-grid :column="4" :show-border="false" class="grid">
				<uni-grid-item v-for="(item,index) in gridList" :key="item.id">
					<navigator :url="item.url+'?index='+index" open-type="navigate" hover-class="other-navigator-hover">
						<image :src="item.img_url" class="img" mode="widthFix"></image>
					</navigator>
				</uni-grid-item>
			</uni-grid>
			
			<uni-grid :column="2" :show-border="false" :square="false" class="peddle">
				<uni-grid-item v-for="item in peddleList" :key="item.id" class="peddle-item">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</uni-grid-item>
			</uni-grid>
			
			<new-product :scrollTop="scrollTop"></new-product>
			
			<note :scrollTop="scrollTop"></note>
			
			<divider></divider>
			<goods-block :bar="goodsBars['送Ta礼物'].img_url" code="1002" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['各种零食'].img_url" code="1003" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['果蔬生鲜'].img_url" code="1004" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['咖啡茶饮'].img_url" code="1005" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<goods-block :bar="goodsBars['各种酒水'].img_url" code="1006" v-if="isUrl()" :scrollTop="scrollTop"></goods-block>
			
			<divider></divider>
			<view class="status">
				<view class="text">吃货研究所店铺资质</view>
				<image src="../../static/icon/right2.png" mode="widthFix" class="right-icon"></image>
			</view>
			
			<shop-info></shop-info>
			<logo></logo>
		</view>
		<tabbar :current="0" v-show="!isSearch"></tabbar>
	</view>
</template>

<script>
	import { getHomeImg, getHotSearch } from '../../api/index.js';
	import goodsBlock from '../../components/goods-block.vue';
	import newProduct from '../../components/new-product/new-product.vue';
	import note from '../../components/note/note.vue'
	import divider from '../../components/divider.vue';
	import shopInfo from '../../components/shop-info.vue';
	import logo from '../../components/logo.vue';
	import search from '../../components/search.vue';
	export default {
		name: "home",
		data() {
			return {
				isSearch: false,
				swiperList: [],
				gridList: [],
				peddleList: [],
				goodsBars: {},
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
			},
			isUrl(){
				return Object.keys(this.goodsBars).length !== 0;
			},
			updateIsSearch(value){
				this.isSearch = value;
			}
		},
		onPageScroll({scrollTop}) {
			this.scrollTop = scrollTop;
		},
		created(){
			this.initialize();
		},
		components: {
			goodsBlock,
			divider,
			shopInfo,
			logo,
			search,
			newProduct,
			note
		}
	}
</script>

<style lang="scss" scoped>
.home-container {
	
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
