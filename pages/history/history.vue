<template>
	<view class="content">
		<view class="wrap" v-for="item in dataArray" :key="item._id" @click="onHandleHistoryClick">
			<view class="wrap-bg" :style="{backgroundImage: 'url(' + item.girlImageUrl +')'}"></view>
			<view class="wrap-item">{{item.publishedAt}}</view>
			<view class="wrap-item">{{item.title}}</view>
		</view>
		<uni-load-more v-if="isShowLoadMore" :status="loadStatus"></uni-load-more>
		<!-- 没有数据提示 -->
		<empty-view v-if="isShowEmptyView" @onHandleReloadData="onHandleReloadData"></empty-view>
		<!-- 遮罩 -->
		<common-loading v-if="isShowCommonLoading"></common-loading>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	import EmptyView from "../../components/EmptyView/EmptyView.vue"
	import commonLoading from '../../components/commonLoading/commonLoading.vue'
	import uniLoadMore from "@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue"
	
	export default {
		components: {
			EmptyView,
			commonLoading,
			uniLoadMore
		},
		data() {
			return {
				isShowEmptyView: false,
				isShowLoadMore: false,
				loadStatus: "more",
				dataArray: [],
				page: 1,
			}
		},
		onLoad() {
			// 第一次手动下拉舒心
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.page = 1;
			this.dataArray = [];
			this.getHistoryData();
		},
		onReachBottom() {
			// 上拉加载
			this.page++;
			this.getHistoryData();
		},
		methods: {
			onHandleHistoryClick() {
				console.log("历史数据点击");
			},
			getHistoryData() {
				uni.showLoading({
					mask: true
				});
				uni.request({
					url: helper.websiteUrl + 'history/content/20/' + this.page,
					method: 'GET',
					data: {},
					success: res => {
						res = res.data;
												
						for (let value of res.results) {
							let imageUrlArray = this.getImageArrayWithContent(value.content);
							if (imageUrlArray.length > 0) {
								value["girlImageUrl"] = imageUrlArray[0];
							} else {
								value["girlImageUrl"] = helper.placeholderImageSrc;
							}
							this.dataArray.push(value);
						}
						console.log(this.dataArray);
					},
					fail: () => {
						console.log("请求失败");
						this.isShowEmptyView = true;
					},
					complete: () => {
						if (this.page == 1) {
							uni.stopPullDownRefresh();
						}
						uni.hideLoading();
					}
				});
			},
			getImageArrayWithContent(content) {
				let imageUrlArray = [];
				
				let regex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
				let arrayOfAllMatches = content.match(regex);
				for (let imgHtml of arrayOfAllMatches) {
					let tmpArray = [];
					if (imgHtml.indexOf("src=\"") != -1) {
						tmpArray = imgHtml.split("src=\"");
					} else if (imgHtml.indexOf("src='") != -1) {
						tmpArray = imgHtml.split("src='");
					} else if (imgHtml.indexOf("src=") != -1) {
						tmpArray = imgHtml.split("src=");
					}
					
					if (tmpArray.length >= 2) {
						let src = tmpArray[1];
						if (src.indexOf("\"") != -1) {
							src = src.substring(0, src.indexOf("\""));
							imageUrlArray.push(src);
						}
					}
				}
				return imageUrlArray;
			},
			onHandleReloadData() {
				// 下拉刷新
				this.page = 1;
				this.dataArray = [];
				this.getHistoryData();
			}
		}
	}
</script>

<style scoped>
.content { display: flex; flex-direction: column; }
.wrap { 
	margin: 10rpx; 
	min-height: 220rpx;
	display: flex; 
	flex-direction: column; 
	justify-content: center; 
	position: relative;
}
.wrap-bg {
	width: 100%;
	height: 100%;
	background-color: #f8f8f8;
	background-repeat: no-repeat;
	background-position: center center;
	background-size: cover;
	border-radius: 10rpx;
	filter: contrast(80%);
	position: absolute;
	left: 0;
	top: 0;
	z-index: -1;
}
.wrap-item {
	margin: 10rpx 20rpx;
	color: #FFFFFF;
	font-size: 40rpx;
	font-weight: bold;
}

</style>
