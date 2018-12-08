import rest from 'shared/helpers/rest';
import store from 'shared/store/configureStore';

const AUTH_SERVER_URL = 'http://localhost:8000';
const RESOURCE_SERVER_URL = 'http://localhost:8001';

export default class ApiService {
  static getBearerToken = () => {
    return store.getState().auth.authObj.access_token;
  };

  static login = (account, password) => {
    const bodyProps = {
      grant_type: 'password',
      username: account,
      password,
    };
    let body = [];
    for (let property in bodyProps) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(bodyProps[property]);
      body.push(encodedKey + '=' + encodedValue);
    }
    body = body.join('&');
    return rest.post(
      `${AUTH_SERVER_URL}/oauth/token`,
      `Basic ${btoa('fooClientIdPassword:secret')}`,
      body,
      { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    );
  };

  static saveVersion = data => {
    return rest.postMultiPartFormData(
      `${RESOURCE_SERVER_URL}/versions`,
      `Bearer ${ApiService.getBearerToken()}`,
      data,
      'xlsx',
    );
  };

  static deleteVersion = (name: string) => {
    return rest.delete(
      `${RESOURCE_SERVER_URL}/versions/${name}`,
      `Bearer ${ApiService.getBearerToken()}`,
    );
  };

  static getVersions = () => {
    return rest.get(
      `${RESOURCE_SERVER_URL}/versions`,
      `Bearer ${ApiService.getBearerToken()}`,
    );
  };
}
