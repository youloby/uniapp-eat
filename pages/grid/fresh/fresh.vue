<template>
	<view class="fresh_container">
		
		<view class="img">
			<image src="../../../static/grid/果蔬.webp" mode=""></image>
		</view>
		<view class="">
			<wuc-tab :tab-list="classifyData" :tabCur.sync="TabCur" :textFlex="true" tab-class="cu-bar" select-class="text-orange" @change="tabChange"></wuc-tab>
		</view>
		
		<view class="giftlist">
			<view v-for="item in classifyGoodsData" :key="item.id" class="gift_item">
				<view class="img">
					<image :src="item.imageUrl" mode=""></image>
				</view>
				<view class="gift_title">
					<view class="title_name">{{ item.title }}</view>
					<view class="title_info">
						{{ item.sell_point}}
					</view>
					<view class="info_price">
						<span class="price">￥{{item.price}}</span>
						
						<view class="img">
							<image src="../../../static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<shopInfo />
		<logo />
		<tabbar :current="-1"></tabbar>


	</view>
</template>

<script>
	import {
		getClassify,
		getClassifyGoods
	} from '../../../api/index.js'
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import shopInfo from '../../../components/shop-info.vue';
	import logo from '../../../components/logo.vue';
	export default {
		data() {
			return {
				TabCur: 0,
				classifyData: [],
				isData:false,
				classifyGoodsData:[],
				
			}
		},
		components: { 
			WucTab,
			shopInfo,
			logo 
		},
		methods: {
			async getClassifyData(index) {
				var {
					data
				} = await getClassify(Number(index))
				console.log(data)
				var title = []
				data.map((item,index)=>{ 
					title.push({name:item.title, sole:item.alias})
				})
				this.classifyData = title
				console.log(title)
				if(this.classifyData !== null){
					this.isData = true
				}else{
					this.isData = false
				}
				
				this.getClassifyGoodsData(this.TabCur)
			},
			async getClassifyGoodsData(index){
				var {data}= await getClassifyGoods(this.classifyData[index].sole)
				this.classifyGoodsData = data
				console.log(this.classifyGoodsData)
			},

			tabChange(index) {
				this.TabCur = index;
				this.getClassifyGoodsData(index)
			},
		},
		async onLoad(option) {
			await this.getClassifyData(option.index)
			console.log(this.classifyData)
			
		}
	}
</script>

<style lang="scss" scoped>
.fresh_container {
		.img {
			width: 100%;
			height: 200rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}


		.giftlist {
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			width: 100%;

			margin-top: 20rpx;

			.gift_item {
				// display: flex;
				width: 47%;
				margin-bottom: 20rpx;
				background: #fff;
				padding: 10rpx;

				.img {
					width: 354rpx;
					height: 360rpx;

					// overflow: hidden;
					image {
						width: 100%;
						height: 100%;
					}


				}

				.gift_title {
					padding: 20rpx;

					.title_name {
						font-weight: 700;
						font-size: 14px;
						margin-bottom: 10rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						/* 指定显示文本的行数 */
						overflow: hidden;
						/* 超出隐藏 */
						text-overflow: ellipsis;
						/* 超出部分显示省略号 */
					}

					.title_info {
						font-size: 12px;
						color: #CCCCCC;
					}

					.info_price {
						display: flex;
						align-items: center;
						// justify-content: center;
						justify-content: space-between;
						margin-top: 10px;

						.price {
							color: #FF4444;
							font-size: 14px;
							font-weight: 600;
						}

						.img {
							width: 48rpx;
							height: 48rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}
					}


				}
			}
		}
	}
.text-orange{
  color:#FF0000
}
.cu-bar{
    font-size: 24rpx;
}
</style>
