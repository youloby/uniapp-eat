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

//获取全部商品
export async function getAllGoods(classify){
	return await instance.get(`/getAllGoods?classify=${classify}`);
}

//获取热门搜索
export async function getHotSearch(){
	return await instance.get('/searchHot');
}

//种草笔记
export async function getShopNote(page,pageSize=5){
	return await instance.get(`/getMoreNote?page=${page}&pageSize=${pageSize}`);
}

//获取商品详情
export async function getGoodsDetails(goodsId){
	return await instance.get(`/getGoodsDetails?goodsId=${goodsId}`);
}
//获取商品详情2
export async function getGoodsDetails2(classify, goodsId){
	return await instance.get(`/getGoodsDetails2?classify=${classify}&goodsId=${goodsId}`);
}

//获取礼物列表
export async function getGiftList(){
	return await instance.get('/getGiftList');
}

//获取分类信息
export async function getClassify(index){
	return await instance.get(`/getClassify?classify=${index+1}`);
}

//获取分类商品
export async function getClassifyGoods(alias){
	return await instance.get(`/getClassifyGoods?alias=${alias}`);
}

//获取搜索结果
export async function getSearchData(keyword){
	return await instance.get(`/getSearchData?keyword=${keyword}`);
}