const axios = require("axios");

class APICalls {
  handleResponse(response) {
    if (
      response.code &&
      (response.code == "ECONNREFUSED" || response.code == "ENOTFOUND")
    ) {
      return {
        err: new Error("Please check your connection"),
      };
    }

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
      return { err: new Error("BAD REQUEST: Please check your request") };
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

  makeCall(callType, url, body, header) {
    if (validateParameters(callType, url, body, header).err) {
      return validateParameters(callType, url, body, header);
    } else {
      let res;
      return new Promise((resolve, reject) => {
        if (callType.toLocaleLowerCase() == "get") {
          res = axios.get(url);
        }

        if (callType.toLocaleLowerCase() == "post") {
          res = axios.post(url, body, {
            headers: header,
          });
        }

        res
          .then((res) => {
            const handledRes = this.handleResponse(res);
            resolve(handledRes);
          })
          .catch((err) => {
            resolve(this.handleResponse(err));
          });
      });
    }
  }
}

function validateParameters(callType, url, body, header) {
  // VALIDATING THE URL
  if (!url || !isURL(url)) {
    return { err: new Error("Badly formatted URL") };
  }

  //VALIDATING THE CALL TYPE
  if (!callType || typeof callType !== "string") {
    return {
      err: new Error("Please specify a call type [GET, POST, PUT, DELETE]"),
    };
  } else if (
    callType.toLocaleLowerCase() !== "get" &&
    callType.toLocaleLowerCase() !== "post"
  ) {
    return {
      err: new Error("Please pass a valid call type"),
    };
  }

  // VALIDATING BODY AND HEADER
  if (callType.toLocaleLowerCase() == "post") {
    if (!body) {
      return {
        err: new Error("Please pass in a body"),
      };
    }

    if (!header) {
      return {
        err: new Error("Please pass in a header"),
      };
    }
  }

  // RETURNING NO ERROR
  return {
    err: null,
  };
}

function isURL(str) {
  var urlRegex =
    "^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$";
  var url = new RegExp(urlRegex, "i");
  return str.length < 2083 && url.test(str);
}

exports.apiCall = new APICalls();
