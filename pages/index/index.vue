<template>
	<view class="content">
		<image class="top-image" :src="topImageSrc" mode="aspectFill"></image>
		<view  v-for="(item, index) in dataArray" :key="index">
			<view class="header">
				<text>{{item.title}}</text>
			</view>
			<view v-for="value in item.values" :key="value._id">
				<view class="cell">
					<view class="cell-text">
						<text class="cell-title">{{value.desc}}</text>
						<text class="cell-classify">{{value.type}} by {{value.who}}</text>
					</view>
					<image class="cell-right-image" v-if="value.isShowImage" :src="value.imageSrc" mode="aspectFit"></image>
				</view>
				<view class="cell-line"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				topImageSrc: "",
				dataArray: [],
			}
		},
		onLoad() {
			this.topImageSrc = helper.placeholderImageSrc;
			this.getTodayData();
		},
		methods: {
			getTodayData() {
				uni.request({
					url: helper.websiteUrl + 'today',
					method: 'GET',
					data: {},
					success: res => {
						let results = res.data.results;
						if (Object.keys(results).indexOf("福利") != -1) {
							// 福利妹子图
							let tempArray = results["福利"];
							try{
								this.topImageSrc = tempArray[0]["url"];
							}catch(e){
								//TODO handle the exception
							}
							
						}
						
						// 数据处理 - 按照指定顺序排列
						let tempDataArray = [];
						for (let title of helper.titleOrderArray) {
							if (Object.keys(results).indexOf(title) != -1) {
								let values = [];
								// 处理每一条数据，主要处理图片
								for (let value of results[title]) {
									// console.log(value);
									let imageSrc = helper.placeholderImageSrc;
									let isShowImage = false;
									if (value.images && value.images.length > 0) {
										isShowImage = true;
										imageSrc = value.images[0];
									}
									values.push(
										{
											_id: value._id,
											desc: value.desc,
											type: value.type,
											who: value.who,
											imageSrc: imageSrc,
											isShowImage: isShowImage
										}
									)
								}
								//塞数据
								tempDataArray.push(
									{
										title: title,
										values : values
									}
								)
							}
						}
						this.dataArray = tempDataArray;
						// console.log(this.dataArray);
					},
					fail: () => {
						
					},
					complete: () => {
						
					}
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
	}
	.top-image {
		width: 750rpx;
	}
	.header {
		font-size: 36rpx;
		font-style: italic;
		color: #AEAEAE;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		padding: 10rpx 15rpx;
		background-color: #F1F1F1;
	}
	.cell {
		display: flex;
		flex-direction: row;
		height: 200rpx;
		padding: 15rpx;
		/* background: #007AFF; */
	}
	.cell-text {
		width: 505rpx;
		display: flex;
		flex-direction: column;
		margin-right: 15rpx;
		/* background: red; */
	}
	.cell-title {
		height: 135rpx;
		line-height: 45rpx;
		font-size: 38rpx;
		overflow: hidden;
		margin-bottom: 15rpx;
		/* background: #4CD964; */
	}
	.cell-classify {
		line-height: 50rpx;
		font-size: 24rpx;
		color: #AEAEAE;
		overflow: hidden;
		text-overflow: ellipsis;
		/* background: #2C405A; */
	}
	.cell-right-image {
		width: 200rpx;
		height: 200rpx;
		/* background: #2C405A; */
	}
	.cell-line {
		height: 2rpx;
		margin: 0 15rpx;
		background-color: #F1F1F1;
	}
</style>
