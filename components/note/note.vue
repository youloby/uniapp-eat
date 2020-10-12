<template>
	<view class="note-container" :id="noteid">
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
					<lazyload :img-url="item.coverPhotos" :scroll-top="scrollTop" class="img"></lazyload>
					<view class="text">
						<view class="title">{{ item.title }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { getNote } from '../../api/index.js';
	export default {
		props: ['scrollTop'],
		data() {
			return {
				noteid: '',
				notes: []
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll(val);
			}
		},
		methods: {
			async getNote(){
				let { status, data } = await getNote(8);
				if(!status){
					this.notes = data;
				}
			},
			getShopnote(){
				uni.navigateTo({
					url: "../shopnote/shopnote"
				})
			},
			onScroll(scrollTop){
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+this.noteid).boundingClientRect(data => {
				    if(!data) return;
					if(data.top < 1400){
						this.isShow = true;
					}
				}).exec()
			}
		},
		created(){
			this.noteid = 'nodeid'+Math.floor(Math.random()*10);
			this.onScroll();
			this.getNote();
		}
	}
</script>

<style lang="scss">
.note-container {
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
					height: 300rpx;
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
}
</style>
