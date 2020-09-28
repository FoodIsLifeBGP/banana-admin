export default class API {
  static path(endpoint) {
    return `${process.env.REACT_APP_BASE_URL}/${endpoint}`;
  }

  static userToken() {
    return localStorage.getItem("userToken");
  }

  static jsonHeaders() {
    let body = {
      mode: 'cors',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      }
    }
    const userToken = this.userToken();
    if(userToken) {
      body.headers["Authorization"] = `Bearer ${JSON.parse(userToken).jwt}`
    }
    return body;
  }

  static jsonPostBody(payload) {
    let body = this.jsonHeaders();
    body.method = "POST";
    body.body = JSON.stringify(payload);
    return body;
  }

  static jsonGetBody() {
    let body = this.jsonHeaders();
    body.method = "GET";
    return body;
  }

  static jsonPost(endpoint, payload) {
    return fetch(this.path(endpoint), this.jsonPostBody(payload))
    .then(res => res.json())
  }

  static jsonGet(endpoint, queryObj=null) {
    let newUrl = this.path(endpoint);
    newUrl.search = new URLSearchParams(queryObj);
    return fetch(newUrl.toString(), this.jsonGetBody())
    .then(r => r.json());
  }

  static storeJwt(token) {
    if(token && token.donor && token.jwt) {
      localStorage.setItem("userToken", JSON.stringify(token));
      return true;
    } else {
      return false;
    }
  }

  static clearJwt() {
    localStorage.removeItem("userToken");
    return true;
  }
}