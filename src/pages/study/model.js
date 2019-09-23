import * as studyApi from './service';

export default {
  namespace: 'study',
  state: {
    studyList: {},
    studyWithStatus: []
  },

  effects: {
    * effectsDemo(_, {call, put}) {
      const {status, data} = yield call(studyApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
      }
    },
    * getStudyByStatus({payload, callback}, {call, put}) {
      const {ok, data} = yield call(studyApi.getStudyByStatus, payload);
      if (ok) {
        yield put({
          type: 'studyWithStatus',
          payload: data
        });
      }
      callback && callback(data)
    },
    * getStudies({payload, callback}, {call, put}) {
      const {ok, data} = yield call(studyApi.queryStudies, payload);
      if (ok) {
        yield put({
          type: 'studyList',
          payload: data
        });
      }
      callback && callback(data)
    },
    * getStudiesShared({payload, callback}, {call, put}) {
      const {ok, data} = yield call(studyApi.queryStudiesShared, payload);
      if (ok) {
        yield put({
          type: 'studyList',
          payload: data
        });
      }
      callback && callback(data)
    },
  },

  reducers: {
    save(state, {payload}) {
      return {...state, ...payload};
    },
    studyList(state, {payload}) {
      return {...state, studyList: payload};
    },
    studyWithStatus(state, {payload}) {
      return {
        ...state,
        studyWithStatus: payload,
      };
    },
  },

};
