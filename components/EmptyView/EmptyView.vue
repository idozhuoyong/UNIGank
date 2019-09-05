<template>
	<view class="content">
		<image class="content-image" :src="imageSrc"></image>
		<view class="content-title">{{title}}</view>
		<view class="content-detail">{{detail}}</view>
		<button class="content-button" type="default" @click="onHandleReloadData">{{buttonText}}</button>
	</view>
</template>

<script>
	export default {
		props: {
			imageSrc: {
				default: "../../static/emptyImage/nodata.png"
			},
			title: {
				default: "暂无数据"
			},
			detail: {
				default: "请检查你的网络连接是否正确！"
			},
			buttonText: {
				default: "重新加载"
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			onHandleReloadData() {
				this.$emit("onHandleReloadData");
			}
		}
	}
</script>

<style scoped>
.content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: #F7F7F7;
	position: absolute;
	top: 0rpx;
	left: 0;
	right: 0;
	bottom: 0;
}
.content-image {
	width: 178rpx;
	height: 151rpx;
}
.content-title {
	color: #333333;
	font-size: 32rpx;
	margin: 20rpx;
}
.content-detail {
	color: #999999;
	font-size: 28rpx;
	margin: 0rpx 20rpx 20rpx;
}
.content-button {
	background-color: #FFFFFF;
	font-size: 28rpx;
	color: #666666;
	padding: 5rpx 40rpx;
}
</style>
