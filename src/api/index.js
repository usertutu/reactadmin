/*
包含 n 个接口请求函数的模块 每个函数返回 promise
要求：能根据接口文档定义请求函数
 */

import ajax from './ajax'
import jsonp from 'jsonp'
// 登陆
 export const reqLogin = (username, password) => ajax('/login', {username, password},
 'POST')
//注册
export  const  reAddUser =(user) =>ajax('./manage/user/add',user,'POST')


/*
通过 jsonp 请求获取天气信息
 */
export function reqWeather(city) {
 const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p4 9MVra6urFRGOT9s8UBWr2`
    return new Promise((resolve, reject) => {
  jsonp(url, {
   param: 'callback'
  }, (error, response) => {
   if (!error && response.status === 'success') {
    const {dayPictureUrl, weather} = response.results[0].weather_data[0]
       resolve({dayPictureUrl, weather})
   }else {
    alert('获取天气信息失败')
   }
  })
 })
}


// 获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId})


// 添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', { parentId, categoryName }, 'POST')


// 更新品类名称
export const reqUpdateCategory = ({categoryId, categoryName}) =>
    ajax('/manage/category/update', {
     categoryId,
        categoryName
        },'POST')

// 根据分类 ID 获取分类
export const reqCategory = (categoryId) => ajax('/manage/category/info', {categoryId})


// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})

// 根据 ID/Name 搜索产品分页列表
export const reqSearchProducts = ({pageNum, pageSize, searchType, searchName}) =>
    ajax('/manage/product/search', {
        pageNum,
        pageSize,
        [searchType]: searchName,
    })

// 添加/更新商品
export const reqAddOrUpdateProduct = (product) =>
    ajax('/manage/product/' +
    (product._id ? 'update' : 'add'), product, 'post')

// 对商品进行上架/下架处理
export const reqUpdateProductStatus = (productId, status) =>
    ajax('/manage/product/updateStatus', {
        productId,
            status },
        'POST')

// 删除图片
export const reqDeleteImg = (name) => ajax('/manage/img/delete', {name}, 'post')
// // 添加/更新用户
// export const reqAddOrUpdateUser = (user) => ajax(BASE + '/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST')
//
// // 获取所有用户的列表
// export const reqUsers = () => ajax(BASE + '/manage/user/list')
// // 删除指定用户
//export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete', {userId}, 'POST')
