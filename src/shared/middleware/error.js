// @flow
// This middleware handles both synchronous and asynchronous errors
// that happen during action dispatch.

const errorMiddleware = (errorHandler: Function) => {
  return (store: Object) => {
    return (next: Function) => {
      return async (action: Object) => {
        try {
          return await next(action);
        } catch (err) {
          errorHandler(err, store.getState, action, next);
          return err;
        }
      };
    };
  };
};

export default errorMiddleware;
