// @flow

import createReducer from 'shared/helpers/createReducer';
import { LOGIN_SUCCESS } from 'views/Login/types';

const defaultAuthState = {
  authObj: null,
};

export const auth = createReducer(defaultAuthState, {
  [LOGIN_SUCCESS](state, action) {
    return {
      ...state,
      authObj: action.result,
    };
  },
});
