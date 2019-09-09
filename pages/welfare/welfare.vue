<template>
	<view>
		<!-- 萌妹子 -->
		<view class="wrap-cell" v-for="(item, index) in dataArray" :key="index">
			<view class="cell" 
				:style='"width: " + (750.0/rowCount) + "rpx; height: " + (750.0/rowCount) + "rpx;"'
				v-for="value in item" :key="value._id"
				@click="onHandleCellClick(value)"
				>
				<image class="cell-image" 
					src="value.url" 
					mode="scaleToFill">
				</image>
				<view class="cell-text"><text space="nbsp" selectable="true">by: {{value.who}}</text></view>
			</view>
		</view>
		<uni-load-more v-if="isLoadMore" :status="loadStatus"></uni-load-more>
		<!-- 没有数据提示 -->
		<empty-view v-if="isShowEmptyView" @onHandleReloadData="onHandleReloadData"></empty-view>
		<!-- 遮罩 -->
		<common-loading v-if="isShowCommonLoading"></common-loading>
	</view>
</template>

<script>
	import helper from "../../common/helper.js";
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
				isShowCommonLoading: false,
				isPullDownRefresh: false,
				// isReachBottom: false,
				isLoadMore: false,
				loadStatus: "more",
				page: 1,
				dataOriginArray: [],
				dataArray: [],
				cellStyle: "",
				rowCount: 3 , // 每一行图片的数量
				isShowPreviewImage: false
			}
		},
		onLoad() {			
			this.isShowCommonLoading = true;
			this.page = 1;
			this.getWelfareData();
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.isShowCommonLoading = true;
			this.page = 1;
			this.getWelfareData();
		},
		onReachBottom() {
			this.page++;
			this.isReachBottom = true;
			this.uniLoadingStatus = "loading";
			this.getWelfareData();
		},
		methods: {
			onHandleReloadData() {
				this.isShowCommonLoading = true;
				this.page = 1;
				this.getWelfareData();
			},
			getWelfareData() {
				if (this.isShowCommonLoading) {
					// 下显示遮罩
					this.isShowCommonLoading = true;
				} else {
					this.isShowCommonLoading = false;
				}
				uni.request({
					url: helper.websiteUrl + "data/福利/20/" + this.page,
					method: 'GET',
					data: {},
					success: res => {
						// 请求成功
						res = res.data
						console.log(res);
						if (res.error == false) {
							// 交易成功
							this.isShowEmptyView = false;
							if (this.page == 1) {
								this.dataOriginArray = [];
							}
							if (res.results && res.results.length > 0) {
								this.dataOriginArray = this.dataOriginArray.concat(res.results);
								
								let tempIndex = 0;
								let tempArray = [];
								let tempDataArray = [];
								for (let value of this.dataOriginArray) {
									if (tempIndex == this.rowCount) {
										tempDataArray.push(tempArray);
										tempIndex = 0;
										tempArray = [];
									}
									tempArray.push(value);
									tempIndex++;
								}
								tempDataArray.push(tempArray);
								this.dataArray = tempDataArray;
							}
						} else {
							// 交易失败
							if (this.isReachBottom) {
								this.isReachBottom = false;
								this.page--;
							} else {
								this.isShowEmptyView = true;
							}
						}
					},
					fail: () => {
						// 请求失败
						// 关闭遮罩
						if (this.isShowCommonLoading) { this.isShowCommonLoading = false; } 
						
						// 停止下拉刷新
						if (this.isPullDownRefresh) { 
							this.isPullDownRefresh = false;
							uni.stopPullDownRefresh(); 
						}
						
						if (this.dataOriginArray.length == 0) {
							
						} else {
							
						}
					}
				});
			},
			onHandleCellClick(value) {
				// console.log(value);
				if (this.isShowPreviewImage) {
					// 防止点击过快导致重复调用 
					return;
				}
				this.isShowPreviewImage = true;
				setTimeout(() => {
					this.isShowPreviewImage = false;
				}, 1000)
				let current = 0;
				let urls = [];
				for (var i = 0; i < this.dataOriginArray.length; i++) {
					let tempValue = this.dataOriginArray[i];
					urls.push(tempValue.url);
					if (tempValue._id === value._id) {
						current = i;
					}
				}
				uni.previewImage({
					current: current,
					urls: urls,
					indicator: "number"
				})
			}
		}
	}
</script>

<style>
.wrap-cell {
	display: flex; 
	flex-direction: row;
}
.cell {
	box-sizing: border-box;
	width: 250rpx;
	height: 250rpx;
	padding: 10rpx;
	border-radius: 10rpx;
}
.cell-image {
	width: 100%; 
	height: 85%; 
	background-color: #F1F1F1;
}
.cell-text {
	width: 100%; 
	height: 15%; 
	color: #AEAEAE; 
	font-size: 24rpx;
	text-align: center;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
</style>
