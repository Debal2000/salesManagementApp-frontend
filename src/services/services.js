import axios from "axios";
import { SERVER_URL, ROLL_NUMBER } from "../utils/constants";
import { getBucket } from "../utils/getBucket";
import { getDate } from "../utils/getDate";

export function serviceCall() {
  return axios.post(`${SERVER_URL}`);
}

export function callDummyAPI(name) {
  return axios.post(
    `${SERVER_URL}${ROLL_NUMBER}/dummy.do?`,
    {},
    {
      headers: { "Content-Type": "application/json" },
      params: { name: name },
    }
  );
}

export function getAPI(path, params) {
  return axios({
    method: "get",
    url: `http://localhost:8080/1805654/${path}`,
    params: params,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (response) {
      console.log(response);
    });
}

export function predictionAPI(toSearch) {
  return axios
    .post(
      "http://127.0.0.1:5000/predict?",
      {},
      {
        headers: { "Content-Type": "application/json" },
        params: {
          data: {
            id: "1805654",
            data: toSearch,
          },
        },
      }
    )
    .then(function (response) {
      response.data.forEach((data, index) => {
        getBucket(data, index);
        getDate(data, index);
      });
    })
    .catch(function (response) {
      console.log(response);
    });
}
