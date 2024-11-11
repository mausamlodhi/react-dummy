import axios from "axios";
import momentTimezone from "moment-timezone";
import {
  removeLocalStorageToken,
  removeSessionStorageToken,
  // getSessionStorageToken,
  getLocalStorageToken,
  // getLocalStorageLanguage,
} from "../utils/common.util";

import config from "../config";
import logger from "../utils/logger";
import { modalNotification } from "../utils";
// import { loadPermission } from "../redux/permissions/permission.slice";
// import store from "../store";

const APIrequest = async ({
  method,
  url,
  baseURL,
  queryParams,
  bodyData,
  cancelFunction,
  formHeaders,
  removeHeaders,
}) => {
  const apiToken = getLocalStorageToken();
  // const language = getLocalStorageLanguage();

  try {
    const axiosConfig = {
      method: method || "GET",
      baseURL: config.API_BASE_URL,
      headers: {
        "content-type": "application/json",
        "X-Frame-Options": "sameorigin",
        timezone: momentTimezone.tz.guess(true),
        // language,
      },
    };

    if (formHeaders) {
      axiosConfig.headers = { ...axiosConfig.headers, ...formHeaders };
    }

    if (baseURL) {
      axiosConfig.baseURL = baseURL;
    }

    if (url) {
      axiosConfig.url = url;
    }

    if (queryParams) {
      const queryParamsPayload = {};
      for (const key in queryParams) {
        if (Object.hasOwnProperty.call(queryParams, key)) {
          let element = queryParams[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (!["", null, undefined, NaN].includes(element)) {
            queryParamsPayload[key] = element;
          }
        }
      }
      axiosConfig.params = queryParamsPayload;
    }

    if (bodyData) {
      const bodyPayload = {};
      for (const key in bodyData) {
        if (Object.hasOwnProperty.call(bodyData, key)) {
          let element = bodyData[key];
          if (typeof element === "string") {
            element = element.trim();
          }
          if (![null, undefined, NaN].includes(element)) {
            bodyPayload[key] = element;
          }
        }
      }
      axiosConfig.data = bodyPayload;
    }

    if (cancelFunction) {
      axiosConfig.cancelToken = new axios.CancelToken((cancel) => {
        cancelFunction(cancel);
      });
    }

    if (removeHeaders) {
      delete axiosConfig.headers;
    }

    if (apiToken) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        authorization: `Bearer ${apiToken}`,
      };
    }

    const res = await axios(axiosConfig);
    return res.data;
  } catch (error) {
    // if (error.response.status === 500) {
    //   console.log("Error message", error.response);
    //   return error.response.data ||;
    // }
    console.log(error);
    if (axios.isCancel(error)) {
      logger("API canceled", error);
      throw new Error(error);
    } else {
      const errorRes = error.response;
      logger("Error in the api request", errorRes);
      if (errorRes && errorRes.status && errorRes.status === 403) {
        /** *Update permission***** */
        // store.dispatch(loadPermission({}, true));
      }
      if (errorRes && errorRes.status && errorRes.status === 500) {
        modalNotification({
          type: "error",
          message: errorRes.data.message || errorRes.data.error.description,
        });
        return errorRes.data;
      }
      if (errorRes && errorRes.status && errorRes.status === 400) {
        if (errorRes.data.message) {
          modalNotification({
            type: "warning",
            message: errorRes.data.message,
          });
        }
        // if ([401].includes(errorRes.data.error.status)) {
        //   removeLocalStorageToken();
        //   removeSessionStorageToken();
        //   let path =
        //     window.location.pathname.search("admin") > 0 ? "/admin" : "/";
        //   window.location.replace(path);
        // }
      } else {
        // modalNotification({
        //   type: "warning",
        //   message: errorRes?.data?.error[0]?.message || "Not Found",
        // });
      }
      if (
        "error" in errorRes.data &&
        Object.keys(errorRes.data.error).length &&
        [401].includes(errorRes.data.error.status)
      ) {
        removeSessionStorageToken();
      }
      if (errorRes && errorRes.status && errorRes.status === 401) {
        modalNotification({
          type: "error",
          message: errorRes?.data?.message,
        });
        if ([401].includes(errorRes.data.error.status)) {
          removeLocalStorageToken();
          removeSessionStorageToken();
          let path =
            window.location.pathname.search("admin") > 0 ? "/admin" : "/";
          window.location.replace(path);
        }
      }
      if (errorRes && errorRes.status && errorRes.status === 429) {
        modalNotification({
          type: "error",
          message: errorRes.data.message || errorRes.data.error.description,
        });
      }
      if (errorRes?.data?.message) {
        // modalNotification({
        //   type: "error",
        //   message: errorRes?.data?.message,
        // });
      } else if (errorRes?.data?.error?.length > 0 && errorRes?.data?.error) {
        modalNotification({
          type: "error",

          message: errorRes?.data?.error[0]?.message,
        });
      }
      return null;
    }
  }
};

export default APIrequest;
