export default class API {
  static path(endpoint) {
    return `${process.env.REACT_APP_BASE_URL}/${endpoint}`;
  }

  static jsonPostBody(payload) {
    let body = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(payload)
    }
    const userToken = localStorage.getItem("userToken");
    if(userToken) {
      body.headers["Authorization"] = `Bearer ${JSON.parse(userToken).jwt}`
    }
    return body;
  }

  static jsonPost(endpoint, payload) {
    return fetch(this.path(endpoint), this.jsonPostBody(payload))
    .then(res => res.json())
  }

  static storeJwt(token) {
    if(token.donor && token.jwt) {
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