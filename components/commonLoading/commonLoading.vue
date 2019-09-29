<template>
	<view class="content">
		<view class="wrap">
			<view class="arc"></view>
			<view class="text"><text class="text-content">LOADING</text></view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	
.content {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.1);
	font-family: 'Inconsolata', monospace;
	overflow: hidden;
}

.wrap {
	position: absolute;
	margin: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 280rpx;
	height: 300rpx;
	background: rgba(51, 51, 51, 0.9);
	opacity: 0.9;
	border-radius: 15%;
}
.arc {
	position: absolute;
	margin: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 150rpx;
	height: 150rpx;
	border-radius: 50%;
	border-top: 2px solid #ffea29;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	animation: rt 2s infinite linear;
}
.arc::before {
	position: absolute;
	margin: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	border-top: 2px solid #8d29ff;
	border-left: 1px solid transparent;
	border-right: 1px solid transparent;
	animation: rt 4s infinite linear reverse;
	content: "";
}
.arc::after {
	position: absolute;
	margin: auto;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 0;
	height: 0;
	border-radius: 50%;
	border-top: initial;
	border-left: initial;
	border-right: initial;
	animation: cw 1.25s infinite;
	content: "";
	background: snow;
}

.text {
	position: absolute;
	height: 40rpx;
	margin: 0 auto;
	left: 0;
	right: 0;
	bottom: 15rpx;
	text-transform: uppercase;
	text-align: center;
	letter-spacing: 0.1em;
	font-size: 14rpx;
	font-weight: lighter;
	color: white;
}
.text-content {
	display: none;
}
.text::after {
	animation: txt 3s infinite;
	content: "";
}

@keyframes rt {
	100% {
		transform: rotate(360deg);
	}
}
@keyframes cw {
	0% {
		width: 0;
		height: 0;
	}
	75% {
		width: 40rpx;
		height: 40rpx;
	}
	100% {
		width: 0;
		height: 0;
	}
}
@keyframes txt {
	0% {
		content: "LOADING.";
	}
	50% {
		content: "LOADING..";
	}
	100% {
		content: "LOADING...";
	}
}

</style>
