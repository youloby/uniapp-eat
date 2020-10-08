<template>
	<view class="tabbar-container">
		<view class="page" v-for="item in list" :key="item.pagePath">
			<navigator :url="item.pagePath">
				
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"list": [
					{"pagePath": "pages/home/home", "text": "主页", 
					"iconPath":"static/icon/home.png", "selectedIconPath":"static/icon/selected_home.png"},
					{"pagePath": "pages/goods/goods", "text": "全部商品",
					"iconPath":"static/icon/goods.png", "selectedIconPath":"static/icon/selected-goods.png"},
					{"pagePath": "pages/cart/cart", "text": "购物车",
					"iconPath":"static/icon/cart.png", "selectedIconPath":"static/icon/selected_cart.png"},
					{"pagePath": "pages/group/group", "text": "吃货交流群",
					"iconPath":"static/icon/group.png", "selectedIconPath":"static/icon/selected_group.png"},
					{"pagePath": "pages/user/user", "text": "我的",
					"iconPath":"static/icon/user.png", "selectedIconPath":"static/icon/selected_user.png"}
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
}
</style>
