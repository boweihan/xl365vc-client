import rest from 'shared/helpers/rest';

export default class ApiService {
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
      'http://localhost:8000/oauth/token',
      'Basic ' + btoa('fooClientIdPassword:secret'),
      body,
      { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    );
  };
}
