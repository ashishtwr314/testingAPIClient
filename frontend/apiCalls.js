const axios = require("axios");

class APICalls {
  handleResponse(response) {
    if (!response) {
      return { err: new Error("No repsonse") };
    }
    if (
      (response.status >= 300 && response.status < 400) ||
      (response.response &&
        response.response.status >= 300 &&
        response.response.status < 400)
    ) {
      return { err: new Error("REDIRECTING") };
    }

    if (
      (response.status >= 400 && response.status < 500) ||
      (response.response &&
        response.response.status >= 400 &&
        response.response.status < 500)
    ) {
      return { err: new Error("BAD REQUEST: Please try to refresh") };
    }

    if (
      (response.status >= 500 && response.status < 600) ||
      (response.response &&
        response.response.status >= 500 &&
        response.response.status < 600)
    ) {
      return {
        err: new Error(
          "INTERNAL SERVER ERROR: Please try agan after some time"
        ),
      };
    }

    return response.data;
  }

  get(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          const handledRes = this.handleResponse(res);
          resolve(handledRes);
        })
        .catch((err) => {
          resolve(this.handleResponse(err));
        });
    });
  }

  post(url, body) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, body)
        .then((res) => {
          const handledRes = this.handleResponse(res);
          resolve(handledRes);
        })
        .catch((err) => {
          resolve({
            err: err,
          });
        });
    });
  }
}

exports.apiCall = new APICalls();
