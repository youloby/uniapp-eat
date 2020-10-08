<template>
	<view class="result-container">
		<uni-search-bar placeholder="搜索商品" @confirm="search" cancelButton="none"
		bgColor="#fff" ref="reSearch"></uni-search-bar>
		
	</view>
</template>

<script>
	import { getSearchData } from '../../../api/index.js';
	export default {
		data() {
			return {
				keyword: "",
				action: 0,
				data: [],
				tab:["综合", "价格", "上新"]
			};
		},
		methods: {
			async getSearchResult(keyword){
				let { status, data } = await getSearchData(keyword);
				if(!status){
					console.log(data);
					this.data = data;
				}
			},
			selected(index){
				this.action = index;
			},
			search(){
			
			}
		},
		mounted(){
			this.$refs.reSearch.replaceSearch(this.keyword);
		},
		onLoad(option) {
			this.keyword = option.keyword;
			this.getSearchResult(option.keyword);
		}
	}
</script>

<style lang="scss" scoped>

</style>
