// @flow

import { combineReducers } from 'redux';
import { ui } from 'redux/state/ui/reducer';
import { auth } from 'redux/state/auth/reducer';
import { version } from 'redux/state/version/reducer';
import { request } from 'redux/state/request/reducer';

export default combineReducers({
  ui,
  auth,
  version,
  request,
});
