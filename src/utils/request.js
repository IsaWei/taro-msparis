import Taro from '@tarojs/taro';
import Cookies from 'js-cookie';
import {noConsole, baseUrl} from '../config';
import formatMessage from '../locales/zh-CN'

const storeToken = res => {
  const headers = res.header
  if (headers.authorization) {
    const token = headers.authorization;
    const tokenStored = Cookies.get('authorization');
    if (tokenStored !== token) {
      Cookies.set('authorization', token, {expires: 1});
    }
  }
  return res;
};

function getToken() {
  // get token from cookies
  const auth = Cookies.get('authorization');
  return `${auth || ''}`;
}

export default (options = {method: 'GET', data: {}}) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  // 处理url
  const TARO_ENV = process.env.TARO_ENV
  options.url = TARO_ENV === 'weapp' ? (baseUrl + options.url) : options.url
  return Taro.request({
    credentials: 'omit',
    url: options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Authorization': getToken()
    },
    method: options.method.toUpperCase(),
  }).then(storeToken).then((res) => {
    const {statusCode, data, header} = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res.data);
      }
    } else {
      // console.error(`网络请求错误，状态码${statusCode}`);
      Taro.atMessage({
        'message': formatMessage['app.custom.error.' + data.code],
        'type': 'error',
      })
    }
    return {ok: statusCode === 200, data: data.data ? data.data : null};
  })
}
