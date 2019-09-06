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
					:src="value.url" 
					mode="scaleToFill">
				</image>
				<view class="cell-text"><text space="nbsp" selectable="true">by: {{value.who}}</text></view>
			</view>
		</view>
		<empty-view v-if="isShowEmptyView" @onHandleReloadData="onHandleReloadData"></empty-view>
	</view>
</template>

<script>
	import helper from "../../common/helper.js";
	import EmptyView from "../../components/EmptyView/EmptyView.vue"
	
	export default {
		components: {
			EmptyView
		},
		data() {
			return {
				isShowEmptyView: false,
				page: 1,
				dataOriginArray: [],
				dataArray: [],
				cellStyle: "",
				rowCount: 3 , // 每一行图片的数量
				isShowPreviewImage: false,
			}
		},
		onLoad() {
			this.getWelfareData();
		},
		onReachBottom() {
			this.page++;
			this.getWelfareData();
		},
		methods: {
			onHandleReloadData() {
				this.isShowEmptyView = false;
				this.getWelfareData();
			},
			getWelfareData() {
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
							let tempIndex = 0;
							let tempArray = [];
							for (let value of res.results) {
								this.dataOriginArray.push(value);
								
								if (tempIndex == this.rowCount) {
									this.dataArray.push(tempArray);
									tempIndex = 0;
									tempArray = [];
								}
								tempArray.push(value);
								tempIndex++;
							}
							this.dataArray.push(tempArray);
						} else {
							// 交易失败
							this.isShowEmptyView = true;
						}
					},
					fail: () => {
						// 请求失败
						this.isShowEmptyView = true;
					},
					complete: () => {}
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
					urls: urls
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
