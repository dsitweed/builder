import axios from "axios";
import { BACKEND_URL, FAILED, SUCCESS } from "../constants/CommonConstants";

const createConfig = (auth) => {
  let config = {};
  if (auth !== undefined)
    config.headers = {
      Authorization: `Bearer ${auth}`,
      Language: "vi",
    };
  return config;
};

const responseSuccess = (res) => {
  const realData = res.data;
  let status = realData.status;
  if (realData.status === SUCCESS) status = true;
  else if (realData.status === FAILED) status = false;
  if (status)
    return {
      data: realData.data,//RealData.data => ?
      status: status,
    };
  return {
    data: realData.data.message,
    status: status,
  };
};

const responseError = (error, t) => {
  if (error.response) {
    const data = JSON.parse(error.response.data).data.message;
    return {
      data: data,
      status: false,
    };
  }
  if (error.request) {
    return {
      data: "kiểm tra lại kết nối mạng",
      status: false,
    };
  }
  return {
    data: error.message,
    status: false,
  };
};

const client = {
  get: async (url, auth) => {
    try {
      let config = createConfig(auth);
      const res = await axios.get(
        `${BACKEND_URL}/${url}`,
        config
      );
      return responseSuccess(res);
    } catch (error) {
      return responseError(error);
    }
  },
  post: async (url, data, auth) => {
    try {
      let config = createConfig(auth);
      const res = await axios.post(
        `${BACKEND_URL}/${url}`,
        data,
        config
      );
      return responseSuccess(res);
    } catch (error) {
      return responseError(error);
    }
  },
  put: async (url, data, auth) => {
    try {
      let config = createConfig(auth);
      const res = await axios.put(
        `${BACKEND_URL}/${url}`,
        data,
        config
      );
      return responseSuccess(res);
    } catch (error) {
      return responseError(error);
    }
  },
  delete: async (url, auth) => {
    try {
      let config = createConfig(auth);
      const res = await axios.delete(
        `${BACKEND_URL}/${url}`,
        config
      );
      return responseSuccess(res);
    } catch (error) {
      return responseError(error);
    }
  },
};

export default client;
