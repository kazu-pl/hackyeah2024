import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getTokens } from "../auth/tokens";
import { API_URL } from "../constants/env";
// import history from "common/router/history";
import { PATHS_CORE } from "../constants/paths";
// import { refreshAccessToken } from "core/store/userSlice";

import { FailedReqMsg } from "../../types/api.types";
// import i18n from "../../i18n";
import { urlLogoutReasonQuery, urlFromQuery } from "../auth/useTokenListener";

interface ExtendedAxiosConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const axiosSecureInstance = axios.create({
  baseURL: API_URL,
});

axiosSecureInstance.interceptors.request.use((config) => {
  const tokens = getTokens();

  // @ts-expect-error it will work anyway
  config.headers = {
    Authorization: `Bearer ${tokens && tokens.accessToken}`,
    // "Accept-Language": i18n.language,
    // "Content-Type": "application/json", // ALTERNATIVE: if you hardcode content-type you don't need to parse body after refreshing accessToken. You also won't need to checking if body is instance of FormData
  };

  return config;
});

axiosSecureInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    const error = err as AxiosError;
    const originalConfig = error.config as ExtendedAxiosConfig;

    if (error.response) {
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        const tokens = getTokens();

        if (!tokens) {
          return axiosSecureInstance(originalConfig);
        }

        try {
          // await refreshAccessToken();

          return axiosSecureInstance({
            ...originalConfig,
            ...(originalConfig.data !== undefined &&
              !(originalConfig.data instanceof FormData) && {
                data: JSON.parse(originalConfig.data),
              }),
          });
        } catch (error) {
          // catch error when obtaining new access token failed
          const axiosError = error as AxiosError;

          const from = window.location.href.slice(
            window.location.origin.length
          );

          const fromWithoutQuery =
            from.indexOf("?") > 0 ? from.slice(0, from.indexOf("?")) : from;

          window.location.href = `${PATHS_CORE.LOGOUT}?${urlLogoutReasonQuery.key}=${urlLogoutReasonQuery.value}&${urlFromQuery}=${fromWithoutQuery}`;

          if (axiosError.response) {
            if (axiosError.response.data) {
              return Promise.reject(axiosError.response.data);
            } else {
              return Promise.reject({
                message:
                  "An error occured but server didn't send any data - on refresh",
              } as FailedReqMsg);
            }
          }

          return Promise.reject(axiosError);
        }
      } else {
        if (error.response.data) {
          return Promise.reject(error.response.data);
        } else {
          return Promise.reject({
            message: "An error occured but server didn't send any data",
          } as FailedReqMsg);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default axiosSecureInstance;
