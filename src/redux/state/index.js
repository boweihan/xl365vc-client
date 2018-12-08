// @flow

import { combineReducers } from 'redux';
import { ui } from 'redux/state/ui/reducer';
import { auth } from 'redux/state/auth/reducer';

export default combineReducers({
  ui,
  auth,
});
