<template>
	<view class="content">
		<view class="wrap" v-for="item in dataArray" :key="item._id" @click="onHandleHistoryClick">
			<view class="wrap-bg" :style="{backgroundImage: 'url(' + item.girlImageUrl +')'}"></view>
			<view class="wrap-item">{{item.publishedAt}}</view>
			<view class="wrap-item">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		data() {
			return {
				dataArray: []
			}
		},
		onLoad() {
			this.getHistoryData();
		},
		methods: {
			onHandleHistoryClick() {
				console.log("历史数据点击");
			},
			getHistoryData() {
				uni.request({
					url: helper.websiteUrl + 'history/content/20/1',
					method: 'GET',
					data: {},
					success: res => {
						res = res.data;
						
						this.dataArray = [];
						
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
					},
					complete: () => {}
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
