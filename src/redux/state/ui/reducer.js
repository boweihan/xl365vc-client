// @flow

import createReducer from 'shared/helpers/createReducer';
import { UPDATE_ROUTE } from 'redux/actions/actionTypes';
import { LOGIN_ROUTE } from 'shared/constants/routes';

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
});
