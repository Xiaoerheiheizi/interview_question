import { message } from 'antd';

const _fetch = async (url, param = {}) => {
	// 使用正则匹配的方式，去除各个参数首尾的空格
	if (JSON.stringify(param) !== '{}') {
		for (let i in param) {
			if (typeof param[i] === 'string') {
				param[i] = param[i].replace(/(^\s*)|(\s*$)/g, "");
			}
		}
	}
	try {
		console.log(url, param, 'helpers.fetch');
		let response = await fetch(url, {
			method  : 'POST',
			headers : {
				'Accept'       : 'application/json',
				'Content-Type' : 'application/json',
				'x-app-os'     : 'pc',
			},
			body    : JSON.stringify(param)
		});
		let res_code = response.status;
		if (res_code === 200) { // 网络请求状态码的检测
			let json = await response.json();
			console.log(json, 'helpers.fetch');
			return json;
		} else if (res_code === 500) {
			toast('错误码 = ' + res_code + '，请联系管理人员或者是客服人员！')
		} else {
			toast('错误码 = ' + res_code)
		}
	} catch (error) {
		return toast(error);
	}
};

/**
 * toast 文字类型弱提示
 * @param {object} resp 数据源
 * @param {number} num 展示toast的秒数
 */
const toast = (resp, num = 3) => {
	resp = resp.message ? resp.message : resp;
	message.info(resp, num);
};

export default {
	toast,
	fetch : _fetch,
}