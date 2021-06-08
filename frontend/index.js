const axios = require("axios");
const { apiCall } = require("./apiCalls");

const doACall = async () => {
  const call = await apiCall.makeCall("GET", "http://localhost:8080/");

  if (call.err) {
    console.log("ERROR OCCUREED", call.err.message);
  } else {
    console.log(call.data);
  }
};

doACall();
