// @flow

import createReducer from 'shared/helpers/createReducer';
import * as actionTypes from 'redux/actions/actionTypes';

const defaultUIState = {};

export const uiState = createReducer(defaultUIState, {});
