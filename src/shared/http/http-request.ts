import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { axiosInstance } from './axios-interceptor.ts';

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};

const httpRequest = async <T>({
  config,
  responseTransformer,
}: {
  config: AxiosRequestConfig;
  responseTransformer?: (res: AxiosResponse<any>['data']) => T;
}): Promise<T> => {
  try {
    const response: AxiosResponse<any> = await axiosInstance(config);
    const responseData = responseTransformer
      ? responseTransformer(response?.data)
      : response?.data;
    return responseData;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export { httpRequest };
