export default class API {
  static path(endpoint) {
    return `${process.env.REACT_APP_BASE_URL}/${endpoint}`;
  }

  static userToken() {
    return localStorage.getItem("userToken");
  }

  static jsonPostBody(payload) {
    let body = {
      method: "POST",
      mode: 'cors',
      headers: {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(payload)
    }
    const userToken = this.userToken();
    if(userToken) {
      body.headers["Authorization"] = `Bearer ${JSON.parse(userToken).jwt}`
    }
    return body;
  }

  static jsonPost(payload, endpoint) {
    return fetch(this.path(endpoint), this.jsonPostBody(payload))
    .then(res => res.json())
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