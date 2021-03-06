// @flow

import axios from 'axios';

const METHOD = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete',
};

export default class Rest {
  static headers(
    auth: ?string,
    optionalHeaders: ?Object,
    isMultiPart: boolean,
  ) {
    optionalHeaders = optionalHeaders || {
      'Content-Type': 'application/json',
    };
    const staticHeaders = {
      Accept: 'application/json',
    };
    const authHeader = auth ? { Authorization: auth } : {};
    if (isMultiPart) {
      delete optionalHeaders['Content-Type'];
    }
    return {
      ...staticHeaders,
      ...optionalHeaders,
      ...authHeader,
    };
  }

  static get(
    route: string,
    auth: ?string,
    optionalHeaders: ?Object,
    timeout?: number,
  ) {
    return this.xhr(route, auth, null, METHOD.GET, optionalHeaders, timeout);
  }

  static put(
    route: string,
    auth: ?string,
    params: any,
    optionalHeaders: ?Object,
    timeout?: number,
  ) {
    return this.xhr(route, auth, params, METHOD.PUT, optionalHeaders, timeout);
  }

  static patch(
    route: string,
    auth: ?string,
    params: any,
    optionalHeaders: ?Object,
    timeout?: number,
  ) {
    return this.xhr(
      route,
      auth,
      params,
      METHOD.PATCH,
      optionalHeaders,
      timeout,
    );
  }

  static post(
    route: string,
    auth: ?string,
    params: any,
    optionalHeaders: ?Object,
    timeout?: number,
  ) {
    return this.xhr(route, auth, params, METHOD.POST, optionalHeaders, timeout);
  }

  static delete(
    route: string,
    auth: ?string,
    params: any,
    optionalHeaders: ?Object,
    timeout?: number,
  ) {
    return this.xhr(
      route,
      auth,
      params,
      METHOD.DELETE,
      optionalHeaders,
      timeout,
    );
  }

  static xhr(
    route: string,
    auth: ?string,
    params: any,
    verb: string,
    optionalHeaders: ?Object,
    timeout?: number,
  ) {
    let isMultiPart = false;
    if (params && params instanceof FormData) {
      isMultiPart = true;
    }

    const instance = axios.create({
      method: verb,
      baseURL: route,
      timeout: timeout || 600000, // default 10 minute timeout
      headers: Rest.headers(auth, optionalHeaders, isMultiPart),
      data: params,
    });

    return instance()
      .then(response => {
        if (response.status === 200) {
          return response.data;
        } else if (response.statusText === 204) {
          // do nothing because there's no body
        } else {
          // successful 2xx status code was returned
          // but we currently don't use those. If you aren't seeing
          // a properly handled response for those cases it's
          // because you need to extend this block of code
        }
      })
      .catch(error => {
        if (error.response) {
          // server responded with non-200 status code
        } else if (error.request) {
          // request was made but no response received
        } else {
          // some other error happened
        }

        // for now let's throw the error, toast reducer is handling message parsing
        throw error;
      });
  }

  // Verify that this works without JQuery when we implement a feature that uses it
  static postMultiPartFormData = (
    url: string,
    auth: string,
    bytes: Array<number>,
    fileName: string,
  ) => {
    // bytes must be an array so that we can convert to a signed 8 byte array below
    var signedBytes = new Int8Array(bytes);
    var formData = new FormData();
    var blob = new Blob([signedBytes], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    formData.append('file', blob, fileName);

    return Rest.post(url, auth, formData, {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    });
  };
}
