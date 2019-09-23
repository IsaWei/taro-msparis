import * as cartApi from './service';
import {clearCurrentUser, saveCurrentUser} from '../../utils/user'

export default {
  namespace: 'cart',
  state: {},

  effects: {
    * effectsDemo(_, {call, put}) {
      const {status, data} = yield call(cartApi.demo, {});
      clearCurrentUser();
      saveCurrentUser(JSON.stringify(data));
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
  },

};
