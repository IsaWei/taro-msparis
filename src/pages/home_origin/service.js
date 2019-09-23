import Request from '../../utils/request';

export const getToken = data => Request({
  url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxb3dfe09568054a75&secret=0cbf3d6f11e9784e93de2d318287821f',
  method: 'GET',
  data
});

export const homepage = data => Request({
  url: '/api/devices',
  method: 'GET',
  header: {
    'content-type': 'application/json' // 默认值
  },
  data,
});
