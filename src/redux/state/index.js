// @flow

import { combineReducers } from 'redux';
import { ui } from 'redux/state/ui/reducer';
import { auth } from 'redux/state/auth/reducer';
import { version } from 'redux/state/version/reducer';

export default combineReducers({
  ui,
  auth,
  version,
});
