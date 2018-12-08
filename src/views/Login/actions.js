// @flow

import ApiService from 'shared/services/ApiService';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE } from './types';

export const login = (account: string, password: string) => ({
  types: [LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE],
  promise: async () => {
    return await ApiService.login(account, password);
  },
});
