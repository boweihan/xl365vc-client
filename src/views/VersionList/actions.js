// @flow
import {
  DELETE_VERSION_PENDING,
  DELETE_VERSION_SUCCESS,
  DELETE_VERSION_FAILURE,
} from './types';
import ApiService from 'shared/services/ApiService';

export const deleteVersion = (name: string) => ({
  types: [
    DELETE_VERSION_PENDING,
    DELETE_VERSION_SUCCESS,
    DELETE_VERSION_FAILURE,
  ],
  promise: async () => {
    await ApiService.deleteVersion(name);
    return null;
  },
});
