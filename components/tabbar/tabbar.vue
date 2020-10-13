<template>
	<view class="tabbar-container">
		<view class="page" v-for="(item, index) in list" :key="index">
			<navigator :url="item.pagePath">
				<image :src="index === current ?item.selectedIconPath :item.iconPath" mode="widthFix" class="icon"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tabbar",
		props:['current'],
		data() {
			return {
				active: 0,
				list: [
					{"pagePath": "/pages/home/home", 
					"iconPath":"/static/icon/home.png", "selectedIconPath":"/static/icon/selected_home.png"},
					{"pagePath": "/pages/goods/goods",
					"iconPath":"/static/icon/goods.png", "selectedIconPath":"/static/icon/selected_goods.png"},
					{"pagePath": "/pages/cart/cart",
					"iconPath":"/static/icon/cart.png", "selectedIconPath":"/static/icon/selected_cart.png"},
					{"pagePath": "/pages/group/group",
					"iconPath":"/static/icon/group.png", "selectedIconPath":"/static/icon/selected_group.png"},
					{"pagePath": "/pages/user/user",
					"iconPath":"/static/icon/user.png", "selectedIconPath":"/static/icon/selected_user.png"}
				]
			};
		}
	}
</script>

<style lang="scss">
.tabbar-container {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: space-between;
	z-index: 999;
	background-color: #fff;
	
	.page {
		flex: 1;
		text-align: center;
		font-size: 28rpx;
		color: #8c8c8c;
		.icon {
			width: 150rpx;
		}
	}
}
</style>
