import axios from 'axios';
import store from '../store';
import {
  getToken,
  getOriginToken
} from '@/utils/auth';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: process.env.AXIOS_TIMEOUT, // 请求超时时间,
  withCredentials: process.env.NODE_ENV === 'development',
  // 客户端发送请求时清除缓存
  headers: process.env.NODE_ENV === 'development' ? {} : {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  }
});

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['Authorization'] = getToken(); // current token
  //   config.headers['originToken'] = getOriginToken(); // origin token
  // }

  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    // 共有的错误拦截
    let res = response.data;
    // 无权限访问
    if (res.code === 0 && res.payload.code === 403) {
      return Promise.reject('error');
    }
    // token无效
    if (res.code === RE.USER_NOT_LOGIN.code) {
      // 调取注册登录接口即可
      // location.href = '/login' // 重新跳转登录页面(还不能直接跳来着。。。，不然不需要登录权限的页面也会跟着跳)
      return Promise.reject('error');
    } else if (res.code === 0) {
      res = res.payload;
      return Promise.resolve(res);
    } else {
      return Promise.resolve(res);
    }
  },
  error => {
    return Promise.reject(error);
  }
);
export default service;
