<template>
	<view class="signin_container">
		<view class="calendar">
			<view class="style_ziti">
				今日已签到
			</view>
			<view class="style_ziti">
				已累计签到{{list.length}}天
			</view>
			<qian-dao class="white" :list="list" :date="date" @day_change="day_change_fun" @date_change="date_change_fun"></qian-dao>
			
		</view>
		<van-cell icon="shop-o"  title="吃货研究所店铺" value="进入店铺" link-type="navigateTo" url="/pages/home/home"/>
		
		
		<uni-grid :column="4" :show-border="false" class="grid">
			<uni-grid-item v-for="(item,index) in gridList" :key="item.id">
				<navigator :url="item.url+'?index='+index" open-type="navigate" hover-class="other-navigator-hover">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</navigator>
			</uni-grid-item>
		</uni-grid>
		<uni-grid :column="3" :show-border="false" class="grid">
			<uni-grid-item v-for="(item,index) in gridList2" :key="item.id">
				<navigator :url="item.url+'?index='+(index+4)" open-type="navigate" hover-class="other-navigator-hover">
					<image :src="item.img_url" class="img" mode="widthFix"></image>
				</navigator>
			</uni-grid-item>
		</uni-grid>
		
		<uni-grid :column="2" :show-border="false" :square="false" class="peddle">
			<uni-grid-item v-for="item in peddleList" :key="item.id" class="peddle-item">
				<image :src="item.img_url" class="img" mode="widthFix"></image>
			</uni-grid-item>
		</uni-grid>
		
		<new-product :scrollTop="scrollTop"></new-product>
		<recommend />
		<shop-info></shop-info>
		<logo></logo>
	</view>
</template>

<script>
	import QianDao from "@/components/qian-dao/qian-dao.vue";
	import { getHomeImg, getHotSearch } from "../../../api/index.js";
	import newProduct from '../../../components/new-product/new-product.vue';
	import shopInfo from '../../../components/shop-info.vue';
	import logo from '../../../components/logo.vue';
	import recommend from '../../../components/recommend/recommend.vue'
	export default {
		data() {
			return {
				date: "",
				// 已经签到的数据列表
				list: [],
				gridList: [],
				gridList2: [],
				peddleList: [],
				scrollTop:0
			};

		}, // 方法
		components: {
			QianDao,
			newProduct,
			shopInfo,
			logo,
			recommend
		},
		methods: {
			// 点击天
			day_change_fun(day) {
				console.log(day);
				// 如果没有签到（可以补签）
				// if (!day.click) {
				//  this.list.push(day.r);
				// }
				// 如果今天没有签到(只签到今天的)
				if (!day.click && day.type == "today") {
					this.list.push(day.r);
				}
				
			},
			// 日期改变时触发
			date_change_fun(date) {
				// 跟新日期
				this.date = date;
				// 清空已经签到的列表
				this.list = [];
				// 根据日期获取已经签到的列表然后赋值
				this.list = ["01"];
			},
			async initialize(){
				let { status, data } = await getHomeImg();
				if(!status){
					
					
					data.grid.map((item)=>{
						if(this.gridList.length !== 4){
							this.gridList.push(item)
						}else{
							if(item.id !== 7){
								this.gridList2.push(item)
							}
						}
					})
					data.peddle.map((item)=>{
						if(this.peddleList.length !== 2 ){
							this.peddleList.push(item)
						}
					})
					console.log(data.peddle)
				}
				
			},
		},
		onPageScroll({scrollTop}) {
			this.scrollTop = scrollTop;
		},
		created(){
			this.initialize();
		},
	}
</script>

<style lang="scss">
.signin_container{
	.calendar{
		width: 100%;
		height: 900rpx;
		background-color: #ff9900;
		color: #fff;
		.white{
			color: #000000;
			margin: auto;
			width: 95%;
			height: 700rpx;
			background-color: #fff;
		}
	}
}
.style_ziti{
	margin-left: 20rpx;
	margin-bottom: 20rpx;
	font-size: 32rpx;
	
}
.grid {
	
	
	background-color: #f6f6f6;
	
	.uni-grid-item {
		display: flex;
		flex-wrap: wrap;
		.img {
			flex: 1;
			width: 100%;
		}
	}
}
.peddle {
	.peddle-item {
		.img {
			width: 96%;
		}
	}
}
</style>
