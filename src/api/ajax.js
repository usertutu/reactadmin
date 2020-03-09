/*能发送 ajax 请求的函数模块mei
包装 axios 函数的返回值是 promise 对象
 axios.get()/post()返回的就是 promise 对象
 返回自己创建的 promise 对象: 统一处理请求异常 异步返回结果数据, 而不是包含结果数据的 response
  */
import axios from 'axios'
import {message} from 'antd'


export default function ajax(url, data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
      //1执行异步ajax请求
      if (method === 'GET') {//发送get请求
      promise = axios.get(url,{// 配置对象
        params: data // 指定请求参数
          })
          } else {
      promise = axios.post(url, data)
  }

      // 2. 如果成功了, 调用resolve(value)
  promise.then(response => {
// 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
resolve(response.data) }).catch(error => {

message.error('请求错误: ' + error.message)
})
})
}