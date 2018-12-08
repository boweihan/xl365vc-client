// @flow

import createReducer from 'shared/helpers/createReducer';
import { VIEW_VERSIONS_SUCCESS } from 'views/Home/types';

const defaultVersionState = {
  fileVersions: [],
};

export const version = createReducer(defaultVersionState, {
  [VIEW_VERSIONS_SUCCESS](state, action) {
    return {
      ...state,
      fileVersions: action.result.fileVersions,
    };
  },
});
