import { useNotificationStore } from '@store/notification';
import axios, { type AxiosError, CancelTokenSource } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 60_000,
});

const cancelTokenSources = new Map<string, CancelTokenSource>();

axiosInstance.interceptors.request.use(
  (config) => {
    const sourceKey = config.url + JSON.stringify(config.params);
    if (cancelTokenSources.has(sourceKey)) {
      const cancelTokenSource = cancelTokenSources.get(sourceKey);
      if (cancelTokenSource) {
        cancelTokenSource.cancel(
          'Repeated API call, cancelling previous request',
        );
        console.error('Canceled request:', sourceKey);
      }
    }

    const cancelTokenSource = axios.CancelToken.source();
    cancelTokenSources.set(sourceKey, cancelTokenSource);
    config.cancelToken = cancelTokenSource.token;

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    const sourceKey =
      response.config.url + JSON.stringify(response.config.params);
    cancelTokenSources.delete(sourceKey);

    if (response?.data?.messages) {
      useNotificationStore.setState({
        message: response.data.messages,
        type: 'success',
      });
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response ? error.response.status : null;
    if (axios.isCancel(error)) {
      console.error('Canceled request:', error.message);
      return Promise.resolve();
    }

    if (status === 500) {
      console.error('Server Error:', error?.response?.data);
      useNotificationStore.setState({
        message: `${status}: Server error!`,
        type: 'error',
      });
    } else if (status === 401) {
      console.error('Unauthorized access:', error?.response?.data);
    } else if (status === 404) {
      console.error('Not found:', error?.response?.data);
    } else {
      console.error('Error occurred:', error?.message);
    }

    return Promise.reject(error);
  },
);

export { axiosInstance };
