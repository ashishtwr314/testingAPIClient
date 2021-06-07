const axios = require("axios");
const { apiCall } = require("./apiCalls");

const makeAGetCall = async () => {
  const getCall = await apiCall.get("http://localhost:8080/");
  if (getCall.err) {
    console.log("ERROR");
  } else {
    console.log("NO ERROR");
  }
};

const makeAPostCall = async () => {
  const postCall = await apiCall.post("http://localhost:8080/post");
  if (postCall.err) {
    console.log("ERROR OCCURED");
  } else {
    consolel;
  }
};

makeAGetCall();

makeAPostCall();
