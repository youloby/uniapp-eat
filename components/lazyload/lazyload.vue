<template>
	<view class="lazyload-container" :id="uid">
		<image :src="imgUrl" mode="widthFix" v-if="isShow" class="lazy-img"></image>
	</view>
</template>

<script>
	function generateUUID() {
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    })
	}
	export default {
		props: ["imgUrl", "scrollTop"],
		data() {
			return {
				uid: '',
				isShow: false
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll(val);
			}
		},
		methods: {
			init(){
			    this.uid = 'uid-' + generateUUID();
			    this.$nextTick(this.onScroll);
			},
			onScroll(scrollTop){
				const id = this.uid;
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+id).boundingClientRect(data => {
				    if(!data) return;
				    if(data.top < 1600){
				        this.isShow = true;
				    }
				}).exec();
			}
		},
		mounted() {
		    this.init()
		}
	}
</script>

<style lang="scss">
.lazyload-container {
	.lazy-img {
		width: 100%;
	}
}
</style>
