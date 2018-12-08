// @flow

import { LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_FAILURE } from './types';

export const logout = () => ({
  types: [LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_FAILURE],
  promise: async () => {
    return null;
  },
});
