import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import Client from 'shared/middleware/client';
import error from 'shared/middleware/error';
import analytics from 'shared/middleware/analytics';
import Rest from 'shared/helpers/rest';
import reducers from 'redux/state';
import handler from 'shared/store/errorHandler';

const configureStore = () => {
  const client = Client(Rest);
  const middlewares = [error(handler), thunk, client, analytics()];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const storeEnhancers = [middlewareEnhancer];
  const composedEnhancer = composeWithDevTools(...storeEnhancers);
  const store = createStore(reducers, {}, composedEnhancer);

  // enable hot reloading outside of production for changes to the root reducer
  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // $FlowFixMe
      module.hot.accept('redux/state', () => {
        const newReducers = require('redux/state').default;
        store.replaceReducer(newReducers);
      });
    }
  }

  return store;
};

export default configureStore();
