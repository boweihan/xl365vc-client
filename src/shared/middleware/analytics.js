// @flow

const analyticsMiddleware = () => {
  return (store: Object) => {
    return (next: Function) => {
      return async (action: Object) => {
        let result = await next(action);
        // sendEvent(store.getState(), action);
        return result;
      };
    };
  };
};

export default analyticsMiddleware;
