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
					"iconPath":"/static/icon/home.webp", "selectedIconPath":"/static/icon/selected_home.webp"},
					{"pagePath": "/pages/goods/goods",
					"iconPath":"/static/icon/goods.webp", "selectedIconPath":"/static/icon/selected_goods.webp"},
					{"pagePath": "/pages/cart/cart",
					"iconPath":"/static/icon/cart.webp", "selectedIconPath":"/static/icon/selected_cart.png"},
					{"pagePath": "/pages/group/group",
					"iconPath":"/static/icon/group.webp", "selectedIconPath":"/static/icon/selected_group.webp"},
					{"pagePath": "/pages/user/user",
					"iconPath":"/static/icon/user.webp", "selectedIconPath":"/static/icon/selected_user.webp"}
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
