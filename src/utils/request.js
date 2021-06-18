import axios from "axios";
import {message} from "ant-design-vue"

const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api';
const service = axios.create({
  baseURL: BASEURL,
  timeout: 15000,
});

//测试文件里的环境变量是否能打印
//打印当前环境
// console.log(process.env.NODE_ENV);
// console.log(process.env.VUE_APP_ABC);


service.interceptors.request.use(
  config => {
    config.headers['authorization'] = localStorage.getItem("token");
    return config;
  },
  error => {
    return Promise.reject(error);
  });


service.interceptors.response.use(response => {
  // 为接口返回数据剥去一层壳
  return response.data
}, error => {
  // 后端捕捉到数据库错误就会返回500
  // 一般来说,后端返回200就一定成功,500就给消息提示
  // 坑response得自己点出来
  // console.log(error.response.data)
  message.error({
    content: error.response.data.meta.msg,
    duration: 2
  })
  return Promise.reject(error)
})

export default service;
