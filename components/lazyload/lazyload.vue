<template>
	<view class="lazyload-container" :id="uid">
		<image :src="imgUrl" mode="widthFix" @load="load" v-if="isArise" v-show="isShow" :class="classArr"></image>
		<image src="/static/easy-loadimage/loadfail.png" mode="widthFix" class="lazy-img" v-show="!isShow"></image>
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
				isShow: false,
				isArise: false,
				classArr: ['lazy-img', 'luce']
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
				        this.isArise = true;
				    }
				}).exec();
			},
			load(){
				this.isShow = true;
				this.classArr.push('tran');
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
		height: 100%;
	}
	.luce {
		opacity: 0;
	}
	.tran {
		opacity: 1;
		transition: all 0.3s;
	}
}
</style>
