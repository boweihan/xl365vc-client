// @flow
import DataService from 'shared/services/DataService';
import ApiService from 'shared/services/ApiService';

import {
  LOGOUT_PENDING,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  CREATE_VERSION_PENDING,
  CREATE_VERSION_SUCCESS,
  CREATE_VERSION_FAILURE,
  VIEW_VERSIONS_PENDING,
  VIEW_VERSIONS_SUCCESS,
  VIEW_VERSIONS_FAILURE,
} from './types';

export const logout = () => ({
  types: [LOGOUT_PENDING, LOGOUT_SUCCESS, LOGOUT_FAILURE],
  promise: async () => {
    return null;
  },
});

export const createVersion = () => ({
  types: [
    CREATE_VERSION_PENDING,
    CREATE_VERSION_SUCCESS,
    CREATE_VERSION_FAILURE,
  ],
  promise: async () => {
    const data = await DataService.getFileData();
    await ApiService.saveVersion(data);
    return null;
  },
});

export const viewVersions = () => ({
  types: [VIEW_VERSIONS_PENDING, VIEW_VERSIONS_SUCCESS, VIEW_VERSIONS_FAILURE],
  promise: async () => {
    return await ApiService.getVersions();
  },
});
