// @flow

import createReducer from 'shared/helpers/createReducer';
import { VIEW_VERSIONS_SUCCESS } from 'views/Home/types';
import { GET_DOCUMENT_ID_SUCCESS } from 'views/Ignition/types';

const defaultVersionState = {
  documentId: '',
  fileVersions: [],
};

export const version = createReducer(defaultVersionState, {
  [VIEW_VERSIONS_SUCCESS](state, action) {
    return {
      ...state,
      fileVersions: action.result.fileVersions,
    };
  },
  [GET_DOCUMENT_ID_SUCCESS](state, action) {
    return {
      ...state,
      documentId: action.result,
    };
  },
});
