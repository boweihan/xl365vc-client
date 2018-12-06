const clientMiddleware = client => ({
  dispatch,
  getState,
}) => next => action => {
  // Pass through plain functions
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }
  const {
    promise, // the async request
    types, // [REQUEST, SUCCESS, FAILURE]
    onSuccess, // override success callback
    onFailure, // override failure callback
    onError, // override error callback
    onDone, // called after completion of action cycle
    data, // pending state data
    ...rest // optional properties
  } = action;
  // If a key promise is not defined, move on
  const dispatchKey = Date.now();

  if (!promise) {
    return next({ ...action, dispatchKey });
  }
  const [REQUEST, SUCCESS, FAILURE] = types; // aliasing
  const pendingStateData = data || {};

  // dispatch request action
  next({ ...rest, dispatchKey, result: pendingStateData, type: REQUEST });

  // initialize callbacks
  const success = result => {
    const nextAction = onSuccess
      ? onSuccess(next, {
          result,
          type: SUCCESS,
          dispatchKey,
          ...rest,
        })
      : { result, type: SUCCESS, dispatchKey, ...rest };
    next(nextAction);
    return result;
  };
  const failure = e => {
    const nextAction = onFailure
      ? onFailure(next, { result: e, type: FAILURE, dispatchKey, ...rest })
      : { result: e, type: FAILURE, dispatchKey, ...rest };
    next(nextAction);
    return e;
  };
  const error = e => {
    const nextAction = onError
      ? onError(next, { error: e, type: FAILURE, dispatchKey, ...rest })
      : { error: e, type: FAILURE, dispatchKey, ...rest };
    next(nextAction);
    return e;
  };
  // not the most consistent implementation but we don't need a DONE action at the moment
  const done = result => {
    onDone && onDone(next, result);
  };

  // Main call. Pass API client and app state into
  // action and handle callbacks.
  return new Promise((resolve, reject) => {
    const successHandler = result => {
      resolve(success(result));
      done(result);
    };
    const errorHandler = e => reject(failure(e));
    promise(client, getState())
      .then(successHandler, errorHandler)
      .catch(err => {
        error(err);
        throw err;
      });
  });
};
export default clientMiddleware;
