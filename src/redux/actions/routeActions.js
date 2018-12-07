// @flow

import { UPDATE_ROUTE } from 'redux/actions/actionTypes';
import type { Route } from 'shared/types';

export const updateRoute = (route: Route) => ({
  type: UPDATE_ROUTE,
  result: {
    route,
  },
});
