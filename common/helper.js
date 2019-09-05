const websiteUrl = 'http://gank.io/api/';

const titleOrderArray = ["iOS", "Android", "前端", "拓展资源", "瞎推荐", "App", "休息视频"];
const placeholderImageSrc = "/static/common/placeholder.png";

// request(transactionId) {
// 	let url = websiteUrl + transactionId;
// 	uni.request({
// 		url: url,
// 		method: 'GET',
// 		data: {},
// 		success: res => {},
// 		fail: () => {},
// 		complete: () => {}
// 	});
// }


export default {
	websiteUrl,
	titleOrderArray,
	placeholderImageSrc
}