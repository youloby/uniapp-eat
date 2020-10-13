<template>
	<view class="result-container">
		<view>
			<uni-search-bar placeholder="搜索商品" @confirm="search" bgColor="#fff" cancelButton="none" ref="result"></uni-search-bar>
		</view>
		<view class="tab">
			<view :class="['option', action==index?'action':'']"
			v-for="(item, index) in tab" :key="index"
			@click="selected(index)">
				{{ item }}
				<view class="filter" v-if="index == 1">
					<view :class="['rank', 'ascend', sel=='asc' ?'sel':'']"></view>
					<view :class="['rank', 'descend', sel=='desc' ?'sel':'']"></view>
				</view>
			</view>
		</view>
		
		<view class="list">
			<view class="goods" v-for="item in data" :key="item.id">
				<navigator :url="'../../details/goodsDetails/goodsDetails?goodsId='+item.id">
					<view class="image">
						<lazyload :img-url="item.image_url" :scroll-top="scrollTop" class="img"></lazyload>
					</view>
					<view class="info">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="buy">
							<view class="price">
								<view class="icon">&yen;</view>{{ item.price }}
							</view>
							<view class="cart-icon" style="background-image: url(../../../static/icon/cart-circle-o.png);background-size: cover;"></view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="empty" v-show="data.length === 0">
				<image src="../../../static/image/empty.png" mode="widthFix" class="empty-img"></image>
				<view class="info">
					<view class="text">没有找到你想要的商品</view>
					<view class="text">换个搜索词试试</view>
				</view>
			</view>
			<view class="no-more" v-show="!isMore">
				没有更多了
			</view>
		</view>
		
		<recommend id="rec"></recommend>
		
		<shop-info show="swiper"></shop-info>
		<logo></logo>
		
		<tabbar></tabbar>
		
	</view>
</template>

<script>
	import recommend from '../../../components/recommend/recommend.vue';
	import shopInfo from '../../../components/shop-info.vue';
	import logo from '../../../components/logo.vue';
	import { getSearchData } from '../../../api/index.js';
	export default {
		data() {
			return {
				page: 1,
				keyword: "",
				action: 0,
				scrollTop: 0,
				sel: "",
				isAscend: false,
				isMore: true,
				data: [],
				tab:["综合", "价格", "上新"]
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll(val);
			}
		},
		methods: {
			
			async getSearchResult(keyword, isLoadMore){
				if(isLoadMore && !this.isMore){
					return;
				}
				let { status, data } = await getSearchData(keyword, this.page);
				if(status) return;
				if(isLoadMore && data.length === 0){
					this.isMore = false;
				}
				if(isLoadMore){
					this.data = this.data.concat(data);
				}else {
					this.data = data;
				}
			},
			selected(index, isSearch){
				this.page = 1;
				this.isMore = true;
				if( !isSearch && (this.action === index && index !== 1) ) return;
				if( !isSearch && index === 1 ){
					this.sel === 'asc' ?this.sel='desc' :this.sel='asc';
				}else {
					this.sel = "";
				};
				switch (index){
					case 0:
						this.getSearchResult(this.keyword);
						break;
					case 1:
						let order = this.isAscend ?'asc' :'desc';
						this.getSearchResult(`${this.keyword}%26order_by=activityPrice%26order=${order}`);
						this.isAscend = !this.isAscend;
						break;
					default:
						this.getSearchResult(this.keyword+'%26order_by=createdTime');
						break;
				}
				this.action = index;
			},
			search({value}){
				this.keyword = value;
				this.selected(this.action, true);
			},
			onScroll(scrollTop){
				const query = uni.createSelectorQuery().in(this);
				query.select('#rec').boundingClientRect(data => {
				    if(!data) return;
					if(data.top < 1400){
						this.page ++;
						this.getSearchResult(this.keyword, true);
					}
				}).exec()
			}
		},
		onPageScroll({scrollTop}){
			this.scrollTop = scrollTop;
		},
		onLoad(option) {
			this.keyword = option.keyword;
			this.getSearchResult(option.keyword);
			this.$nextTick(function(){
				this.onScroll();
			});
		},
		components: {
			recommend,
			shopInfo,
			logo
		}
	}
</script>

<style lang="scss" scoped>
.result-container {
	margin-bottom: 120rpx;
	.tab {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		.option {
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
			color: #717171;
			text-align: center;
			font-size: 28rpx;
			.filter {
				position: relative;
				display: inline-block;
				.rank {
					position: absolute;
					left: 10rpx;
					width: 6rpx;
					height: 6rpx;
					transform: rotate(45deg);
				}
				.ascend {
					top: -18rpx;
					border-left: 2rpx solid #bbb;
					border-top: 2rpx solid #bbb;
				}
				.descend {
					bottom: 0rpx;
					border-right: 2rpx solid #bbb;
					border-bottom: 2rpx solid #bbb;
				}
				.sel {
					border-color: #f44;
				}
			}
		}
		.action {
			color: #f44;
		}
	}
	.list {
		padding: 0 30rpx;
		.goods {
			display: flex;
			justify-content: space-between;
			margin: 20rpx 0;
			background-color: #fff;
			.image {
				width: 290rpx;
				height: 290rpx;
				margin-right: 20rpx;
				.img {
					width: 100%;
				}
			}
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-right: 24rpx;
				.title {
					margin: 24rpx 0 8rpx;
					color: #323233;
					font-size: 28rpx;
				}
				.buy {
					display: flex;
					justify-content: space-between;
					height: 88rpx;
					align-items: center;
					.price {
						display: flex;
						color: #f44;
						font-size: 36rpx;
						align-items: center;
						.icon {
							margin-right: 4rpx;
							font-size: 24rpx;
						}
					}
					.cart-icon {
						width: 48rpx;
						height: 48rpx;
					}
				}
			}
		}
		.empty {
			padding: 64rpx;
			text-align: center;
			.empty-img {
				width: 320rpx;
			}
			.info {
				margin-top: 32rpx;
				.text {
					color: #969799;
					font-size: 28rpx;
				}
			}
		}
		.no-more {
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
			color: #999;
			font-size: 26rpx;
		}
	}
}
</style>
