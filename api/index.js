import instance from './config.js';

//获取首页图片
export async function getHomeImg(){
	return await instance.get('/getHomeImg') 
}

//获取商品
export async function getGoods(code){
	return await instance.get(`/getGoods?code=${code}`) 
}

//获取文章
export async function getNote(size){
	return await instance.get(`/getNote?size=${size}`)
}

export async function getSpecialImg(type){
	return await instance.get(`/getSpecialImg?type=${type}`);
}

export async function getAllGoods(url){
	return await instance.get(`/getAllGoods?url=${url}`);
}

//获取热门搜索
export async function getHotSearch(){
	return await instance.get('/searchHot');
}


