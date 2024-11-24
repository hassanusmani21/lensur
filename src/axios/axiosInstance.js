import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://crm-api.synterratech.in/lens-svc";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const setupInterceptors = (showLoader, hideLoader) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = Cookies.get("access_token");
      if (token !== "null" && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      showLoader();
      return config;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      hideLoader();
      return response;
    },
    (error) => {
      hideLoader();
      return Promise.reject(error);
    }
  );
};

export default axiosInstance; // Set default export
export { setupInterceptors };
