// @flow

import createReducer from 'shared/helpers/createReducer';
import { UPDATE_ROUTE } from 'redux/actions/actionTypes';
import { LOGIN_ROUTE, HOME_ROUTE } from 'shared/constants/routes';
import { LOGIN_SUCCESS } from 'views/Login/types';

const defaultUIState = {
  route: {
    name: LOGIN_ROUTE,
    props: undefined,
  },
};

export const ui = createReducer(defaultUIState, {
  [UPDATE_ROUTE](state, action) {
    return {
      ...state,
      route: action.result.route,
    };
  },
  [LOGIN_SUCCESS](state, action) {
    return {
      ...state,
      route: {
        name: HOME_ROUTE,
      },
    };
  },
});
