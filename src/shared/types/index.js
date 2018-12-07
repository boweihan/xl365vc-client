// @flow

export type Theme = {
  colors: Object,
};

export type DialogCloseMessage = {
  action: string,
  payload: any,
};

export type Route = {
  name: string,
  props: ?Object,
};
