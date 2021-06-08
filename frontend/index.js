const axios = require("axios");
const { apiCall } = require("./apiCalls");

const doACall = async () => {
  const params = {
    method: "GET",
    url: "http://localhost:8080/",
    body: {},
    header: {},
  };
  const call = await apiCall.makeCall(params);

  if (call.err) {
    console.log("ERROR OCCUREED", call.err.message);
  } else {
    console.log(call.data);
  }
};

doACall();
