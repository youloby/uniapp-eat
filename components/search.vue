<template>
	<view>
		<view>
			<uni-search-bar class="search" :placeholder="hotSeatch[0]" cancelButton="auto" bgColor="#fff"
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
				<image src="../static/icon/delete.png" mode="widthFix" class="del-icon"></image>
				清空历史搜索
			</view>
		</view>
	</view>
</template>

<script>
	import { getHotSearch } from '../api/index.js';
	export default {
		data() {
			return {
				isSearch: false,
				hotSeatch: [],
				recordSearch: []
			};
		},
		methods:{
			async getHotSearch(){
				let { status, data } = await getHotSearch();
				if(!status){
					this.hotSeatch = data;
				}
				let storageData = uni.getStorage({
					key: "record",
					success: res => {
						this.recordSearch = res.data
					}
				});
			},
			searchPage(value){
				this.isSearch = value;
				this.$emit('updateIsSearch', value);
				if(value){
					uni.hideTabBar();
				}else {
					uni.showTabBar();
				}
			},
			confirm({value}){
				if(this.recordSearch.includes(value.trim())){
					return;
				}
				this.recordSearch.push(value.trim());
				uni.setStorage({key: "record", data: this.recordSearch});
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
			}
		},
		created(){
			this.getHotSearch();
		}
	}
</script>

<style lang="scss"  scoped>
	/deep/.search {
		.uni-searchbar__box {
			justify-content: initial;
		}
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
</style>
