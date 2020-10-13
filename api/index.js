import instance from './config.js';

//获取首页数据
export async function getHomeData(){
	return await instance.get('/getHomeData') 
}

//获取新品商品
export async function getNewGoods(page, pageSize, order){
	return await instance.get(`/getNewGoods?page=${page}&pageSize=${pageSize}&order=${order}`); 
}

//获取首页商品
export async function getHomeGoods(goodsIds){
	return await instance.get(`/getHomeGoods?goodsIds=${goodsIds}`) 
}

//获取文章
export async function getNote(size){
	return await instance.get(`/getNote?size=${size}`)
}

export async function getSpecialImg(type){
	return await instance.get(`/getSpecialImg?type=${type}`);
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
export async function getGoodsDetails2({alias, goodsIds, id}){
	console.log(goodsIds, id);
	return await instance.get(`/getGoodsDetails2?alias=${alias}&goodsIds=${goodsIds}&id=${id}`);
}

//获取礼物列表
export async function getGiftList(page,pageSize=10){
	return await instance.get(`/getGiftList?page=${page}&pageSize=${pageSize}`);
}

//获取分类信息
export async function getClassify(index){
	return await instance.get(`/getClassify?classify=${index+1}`);
}

//获取分类商品
export async function getClassifyGoods(alias, pageSize=10, page=1){
	return await instance.get(`/getClassifyGoods?alias=${alias}&page=${page}&pageSize=${pageSize}`);
}

//获取搜索结果
export async function getSearchData(keyword, page=1, pageSize=10){
	return await instance.get(`/getSearchData?page=${page}&pageSize=${pageSize}&keyword=${keyword}`);
}

//获取更多精选商品
export async function getRecommend(){
	return await instance.get('/getRecommend');
}