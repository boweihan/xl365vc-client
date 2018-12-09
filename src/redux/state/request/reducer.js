// @flow

import createReducer from 'shared/helpers/createReducer';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from 'views/Login/types';
import { LOGOUT_SUCCESS, VIEW_VERSIONS_PENDING } from 'views/Home/types';

const defaultRequestState = {
  login: false,
};

export const request = createReducer(defaultRequestState, {
  [LOGIN_PENDING](state, action) {
    return { ...state, login: true };
  },
  [LOGIN_SUCCESS](state, action) {
    return { ...state, login: false };
  },
  [LOGIN_FAILURE](state, action) {
    return { ...state, login: false };
  },
});
