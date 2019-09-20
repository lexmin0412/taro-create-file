
/**
 * model模版
 * @param {string} pathname 文件名
 */

const echoModelTpl = pathname => {
  return `import ${pathname}Service from '../services/${pathname}.service';

export default {
  namespace: '${pathname}',
  state: {

  },

  effects: {
    *effectsDemo({ payload }, { call, put, select }) {
      const { code, data } = yield call(${pathname}Service.demo, {});
      if (code === 0) {
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
    save(state, { payload }) {
      return { 
        ...state, 
        ...payload 
      };
    },
  },

};
`;
} 

module.exports = echoModelTpl