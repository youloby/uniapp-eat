<template>
	<view class="member_container">
		<view class="item" v-for="item in imgData" :key="item.img_url">
			<view class="img">
				<image :src="item.img_url" mode=""></image>
			</view>
		</view>
		
		<shop-info />
		<logo />
		<tabbar :current="-1"></tabbar>
	</view>
</template>

<script>
	import shopInfo from '../../../components/shop-info.vue';
	import logo from '../../../components/logo.vue';
	export default {
		data() {
			return {
				imgData:[
					{img_url:"../../../static/grid/vip.webp"},
					{img_url:"../../../static/grid/vip2.webp"},
					{img_url:"../../../static/grid/vip3.webp"},
					{img_url:"../../../static/grid/vip4.webp"},
					{img_url:"../../../static/grid/vip5.webp"},
				],
				
			};
		},
		components:{
			shopInfo,
			logo
		}
	}
</script>

<style lang="scss">
.member_container{
	.item{
		.img{
			width: 100%;
			height: 1600rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
