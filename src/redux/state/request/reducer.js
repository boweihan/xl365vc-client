// @flow

import createReducer from 'shared/helpers/createReducer';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from 'views/Login/types';
import {
  CREATE_VERSION_PENDING,
  CREATE_VERSION_SUCCESS,
  CREATE_VERSION_FAILURE,
} from 'views/Home/types';

const defaultRequestState = {
  login: false,
  createVersion: false,
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
  [CREATE_VERSION_PENDING](state, action) {
    return { ...state, createVersion: true };
  },
  [CREATE_VERSION_SUCCESS](state, action) {
    return { ...state, createVersion: false };
  },
  [CREATE_VERSION_FAILURE](state, action) {
    return { ...state, createVersion: false };
  },
});
