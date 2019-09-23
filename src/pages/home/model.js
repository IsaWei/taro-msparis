import * as loginApi from './service';
import CryptoJS from "crypto-js";
import {saveCurrentUser, clearCurrentUser} from '../../utils/user'
import {setAuthority, getAuthority} from '../../utils/authority'
import Taro from "@tarojs/taro";
import formatMessage from "../../locales/zh-CN";

export default {
  namespace: 'login',
  state: {},

  effects: {
    * effectsDemo(_, {call, put}) {
      const {status, data} = yield call(loginApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
      }
    },
    * accountLogin({payload, callback}, {call, put}) {
      payload.password = CryptoJS.AES.encrypt(payload.password, 'HuoTu0KeYForAe3').toString()
      const {ok, data} = yield call(loginApi.login, payload);
      if (ok) {
        saveCurrentUser(data)
        setAuthority(data.role)
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
        callback && callback(data)
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },

};
