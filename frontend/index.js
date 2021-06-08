const axios = require("axios");
const { apiCall } = require("./apiCalls");

const doACall = async () => {
  const call = await apiCall.makeCall(
    "post",
    "http://localhost:8080/post",
    { fsdf: "sdfsf" },
    { sdfsdf: "sdfsdf/sdf" }
  );

  if (call.err) {
    console.log("ERROR OCCUREED", call.err.message);
  } else {
    console.log("NO ERROS, ALL GOOD");
  }
};

doACall();
